import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap'; // Corrected import
import MeetNav from './MeetNav';
import { useAuth0 } from '@auth0/auth0-react';

export default function PostMeetUps() {
  const [forums, setForums] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [invite, setInvite] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState('');
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [profile_id, setProfile_id] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/forumposts/', {
        name: name,
        description: description,
        invite: invite,
        main_image: mainImage,
        images: images,
        skill_level: skill,
        location: location,
        type: type,
        tags: tags,
        category: category,
        profile_id: profile_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/forumposts/');
        const categoryResponse = await axios.get('http://localhost:8000/categories/');
        setForums(response.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleForumClick = (id) => navigate(`/forum-details/${id}`);

  return (
    <div className='forumPage'>
      <h1 style={{ fontSize: '40px' }}><u>Forums</u></h1>
      <MeetNav/>
      <Container>
        <Form onSubmit={handlePost}>
          <Row>
            <Form.Label column lg={2}>
              Title
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Title" value={name} onChange={(e) => setName(e.target.value)} />
            </Col>
          </Row>
          <Form.Select className='post-category' aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Select a Category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))}
          </Form.Select>
          <Form.Group className="mb-3 post-body" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 post-images">
            <Form.Label>Add Main Image</Form.Label>
            <Form.Control type="file" value={mainImage} onChange={(e) => setMainImage(e.target.files[0])} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 post-images">
            <Form.Label>Add Images</Form.Label>
            <Form.Control type="file" value={images} onChange={(e) => setImages(e.target.files[0])} />
          </Form.Group>
          <Row className='post-links'>
            <Form.Label column lg={2}>
              Links
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Links" value={skill} onChange={(e) => setSkill(e.target.value)} />
            </Col>
          </Row>
          <Row className='post-tags'>
            <Form.Label column lg={2}>
              Location
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Tags" value={location} onChange={(e) => setLocation(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Form.Label column lg={2}>
              Type
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter" value={type} onChange={(e) => setType(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Form.Label column lg={2}>
              Tags
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter" value={tags} onChange={(e) => setTags(e.target.value)} />
            </Col>
          </Row>
          <Button as="input" type="submit" value="Submit" />{' '}
        </Form>
      </Container>
    </div>
  );
}