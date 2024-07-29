import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ForumNav from './ForumNav';

export default function ForumDetails() {
  const { id } = useParams();
  const [forum, setForum] = useState(null);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [post_id, setPost_id] = useState('');
  const [profile_id, setProfile_id] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/forumposts/${id}`);
        const categoryResponse = await axios.get('http://localhost:8000/categories/');
        const profileResponse = await axios.get('http://localhost:8000/profiles/');
        setForum(response.data);
        setCategories(categoryResponse.data);
        setProfiles(profileResponse.data);
        setPost_id(response.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('body', body);
    formData.append('post_id', post_id);
    formData.append('profile_id', profile_id);
    if (image) formData.append('image', image);

    console.log('Posting data:', formData);

    try {
      await axios.post('http://localhost:8000/comments/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModal(true); // Show modal upon successful post
      window.location.reload()
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  if (!forum) {
    return <div>Loading...</div>;
  }

  return (
    <div className='forumPage'>
      <h1 style={{ fontSize: '40px' }}><u>Forum Details</u></h1>
      <ForumNav categories={categories} />
      <Container className='detail-cards'>
        <Card key={forum.id}>
          <Card.Header as="h5">{forum.username}</Card.Header>
          <Card.Body>
            <Card.Title>{forum.title}</Card.Title>
            <Card.Text>{forum.body}</Card.Text>
            <img className='forum-image' src={forum.images} alt="Forum" />
          </Card.Body>
        </Card>
        <Form onSubmit={handleComment}>
          <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
            <Form.Control value={body} onChange={(e) => setBody(e.target.value)} as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Add Images</Form.Label>
            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])}/>
          </Form.Group>
          <Form.Select className='post-category' aria-label="Default select example" value={profile_id} onChange={(e) => setProfile_id(e.target.value)} required>
            <option>Select a User</option>
            {profiles.map((profile) => (
              <option value={profile.id} key={profile.id}>{profile.id}</option>
            ))}
          </Form.Select>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {forum.comments.map((comment) => (
          <Card key={comment.id}>
            <Card.Header as="h5">{comment.username}</Card.Header>
            <Card.Body>
              <Card.Text>{comment.body}</Card.Text>
              {comment.image && comment.image !== 'http://localhost:8000/media/default_photo.jpg' && <img src={comment.image} alt="Comment" />}
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}


