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
  const [profiles, setProfiles] = useState([]);
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
        const profileResponse = await axios.get('http://localhost:8000/profiles/');
        setCategories(categoryResponse.data);
        setProfiles(profileResponse.data);
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
      <h1 className="mb-4" style={{ fontSize: '40px' }}><u>Post Meet Up</u></h1>
      <MeetNav />
      <Container>
        <Form onSubmit={handlePost}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="small-text">
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter Title" value={name} onChange={(e) => setName(e.target.value)} required />
            </Col>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="small-text">Category</Form.Label>
            <Form.Select aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option>Select a Category</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small-text">Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="small-text">Add Main Image</Form.Label>
            <Form.Control type="file" onChange={(e) => setMainImage(e.target.files[0])} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small-text">Add Images</Form.Label>
            <Form.Control type="file" multiple onChange={(e) => setImages(e.target.files)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check 
              type="checkbox" 
              label="Invite Only" 
              checked={invite} 
              onChange={(e) => setInvite(e.target.checked)} 
            />
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="small-text">
              Skill Level
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter Skill Level" value={skill} onChange={(e) => setSkill(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="small-text">
              Location
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="small-text">
              Type
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter Type" value={type} onChange={(e) => setType(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} className="small-text">
              Tags
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small-text">Profile</Form.Label>
            <Form.Select aria-label="Select a Profile" value={profile_id} onChange={(e) => setProfile_id(e.target.value)} required>
              <option>Select a Profile</option>
              {profiles.map((profile) => (
                <option value={profile.id} key={profile.id}>
                  {profile.username} {/* Display profile name */}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary">Submit</Button>
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



