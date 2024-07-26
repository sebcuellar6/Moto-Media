import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap'; // Corrected import
import ForumNav from './ForumNav';
import { useAuth0 } from '@auth0/auth0-react';

export default function Forums() {
  const [forums, setForums] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  let navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState('');
  const [links, setLinks] = useState('');
  const [category, setCategory] = useState('');
  const [profile, setProfile] = useState('');
  const [choice1, setChoice1] = useState('');
  const [choice2, setChoice2] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/forumposts/', {
        title: title,
        tags: tags,
        body: body,
        images: images,
        links: links,
        category: category,
        profile: profile,
        first_choice: choice1,
        second_choice: choice2,
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
      <ForumNav categories={categories} />
      <Container>
        <Form onSubmit={handlePost}>
          <Row>
            <Form.Label column lg={2}>
              Title
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Col>
          </Row>
          <Form.Select className='post-category' aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Select a Category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))}
          </Form.Select>
          <Form.Group className="mb-3 post-body" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 post-images">
            <Form.Label>Add Images</Form.Label>
            <Form.Control type="file" onChange={(e) => setImages(e.target.files[0])} />
          </Form.Group>
          <Row className='post-links'>
            <Form.Label column lg={2}>
              Links
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Links" value={links} onChange={(e) => setLinks(e.target.value)} />
            </Col>
          </Row>
          <Row className='post-tags'>
            <Form.Label column lg={2}>
              Tags
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <h1 className='poll'><u>Poll</u></h1>
            <Form.Label column lg={2}>
              Poll subject #1
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter" value={choice1} onChange={(e) => setChoice1(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Form.Label column lg={2}>
              Poll subject #2
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Enter" value={choice2} onChange={(e) => setChoice2(e.target.value)} />
            </Col>
          </Row>
          <Button as="input" type="submit" value="Submit" />{' '}
        </Form>
      </Container>
    </div>
  );
}

