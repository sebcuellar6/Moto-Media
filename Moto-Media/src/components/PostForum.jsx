import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap'; // Corrected import
import ForumNav from './ForumNav';

export default function Forums() {
  const [forums, setForums] = useState([]);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  const [title, setTitle] = useState()

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
        <Form>
        <Row>
          <Form.Label column lg={2}>
            Title
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Enter Title" />
          </Col>
        </Row>
        <Form.Select className='post-category' aria-label="Default select example">
            <option>Select a Category</option>
            {categories.map((category) => (
                <option value={category.id} key={category.id}>{category.name}</option>
            ))}
        </Form.Select>
        <Form.Group className="mb-3 post-body" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Body</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3 post-images">
            <Form.Label>Add Images</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Row  className='post-links'>
          <Form.Label column lg={2}>
            Links
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Enter Links" />
          </Col>
        </Row>
        <Row className='post-tags'>
          <Form.Label column lg={2}>
            Tags
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Enter Tags" />
          </Col>
        </Row>
        <Row>
            <h1 className='poll'><u>Poll</u></h1>
          <Form.Label column lg={2}>
            Poll subject #1
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Enter" />
          </Col>
        </Row>
        <Row>
          <Form.Label column lg={2}>
            Poll subject #2
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Enter" />
          </Col>
        </Row>
        <Button as="input" type="submit" value="Submit" />{' '}
        </Form>
      </Container>
    </div>
  );
}
