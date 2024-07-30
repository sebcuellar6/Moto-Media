import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function UpdateForum() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState({ title: '', body: '', tags: '', links: '', profile_id: '' });
  const [images, setImages] = useState(null);

  useEffect(() => {
    const getForum = async () => {
      try {
        console.log(`Fetching forum with id: ${id}`);
        const response = await axios.get(`http://localhost:8000/forumposts/${id}/`);
        console.log('Fetched forum:', response.data);
        setForum(response.data);
      } catch (error) {
        console.error('Error fetching forum:', error);
      }
    };
    getForum();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForum((prevForum) => ({ ...prevForum, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', forum.title);
    formData.append('body', forum.body);
    formData.append('tags', forum.tags);
    formData.append('links', forum.links);
    formData.append('profile_id', forum.profile_id);
    if (images) {
      formData.append('images', images);
    }
    try {
      console.log('Updating forum with data:', forum);
      await axios.put(`http://localhost:8000/forumposts/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Forum updated successfully');
      navigate('/forums');
    } catch (error) {
      console.error('Error updating forum:', error);
    }
  };

  return (
    <div className="update-forum">
      <h1>Update Forum</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={forum.title}
            onChange={handleChange}
            maxLength="75"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            value={forum.body}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            value={forum.tags}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Links</Form.Label>
          <Form.Control
            type="text"
            name="links"
            value={forum.links}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Profile ID</Form.Label>
          <Form.Control
            type="text"
            name="profile_id"
            value={forum.profile_id}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            onChange={handleFileChange}
            accept="image/*"
          />
        </Form.Group>
        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </div>
  );
}



