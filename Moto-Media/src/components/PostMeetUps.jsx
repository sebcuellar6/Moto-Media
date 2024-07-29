import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import MeetNav from './MeetNav';
import { useAuth0 } from '@auth0/auth0-react';

export default function PostMeetUps() {
  const [categories, setCategories] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [invite, setInvite] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState(null);
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [profile_id, setProfile_id] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('invite', invite);
    if (mainImage) {
      formData.append('main_image', mainImage);
    }
    if (images) {
      Array.from(images).forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }
    formData.append('skill_level', skill);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('tags', tags);
    formData.append('category', category);
    formData.append('profile_id', profile_id);

    try {
      await axios.post('http://localhost:8000/meetups/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModal(true);  // Show modal upon successful post
    } catch (error) {
      console.log('Error posting meetup:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:8000/categories/');
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/meetups');  // Navigate to meetups page after closing modal
  };

  return (
    <div className='heroPage'>
      <h1 style={{ fontSize: '40px' }}><u>Post Meet Up</u></h1>
      <MeetNav />
      <Container>
        <Form onSubmit={handlePost}>
          {/* Your existing form fields */}
          <Row>
            <Form.Label column lg={2}>
              Title
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Title" value={name} onChange={(e) => setName(e.target.value)} required />
            </Col>
          </Row>
          <Form.Select className='post-category' aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option>Select a Category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))}
          </Form.Select>
          <Form.Group className="mb-3 post-body" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 post-images">
            <Form.Label>Add Main Image</Form.Label>
            <Form.Control type="file" onChange={(e) => setMainImage(e.target.files[0])} />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3 post-images">
            <Form.Label>Add Images</Form.Label>
            <Form.Control type="file" multiple onChange={(e) => setImages(e.target.files)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inviteOnly">
            <Form.Check 
              type="checkbox" 
              label="Invite Only" 
              checked={invite} 
              onChange={(e) => setInvite(e.target.checked)} 
            />
          </Form.Group>
          <Row className='post-links'>
            <Form.Label column lg={2}>
              Skill Level
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Skill Level" value={skill} onChange={(e) => setSkill(e.target.value)} />
            </Col>
          </Row>
          <Row className='post-tags'>
            <Form.Label column lg={2}>
              Location
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </Col>
          </Row>
          <Row>
            <Form.Label column lg={2}>
              Type
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Type" value={type} onChange={(e) => setType(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Form.Label column lg={2}>
              Tags
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Form.Label column lg={2}>
              Profile
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter ID" value={profile_id} onChange={(e) => setProfile_id(e.target.value)} />
            </Col>
          </Row>
          <Button as="input" type="submit" value="Submit" />
        </Form>
      </Container>

      {/* Modal for success */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your meetup has been posted successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Go to Meetups
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


