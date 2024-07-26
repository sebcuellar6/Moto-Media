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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/forumposts/${id}`);
        const categoryResponse = await axios.get('http://localhost:8000/categories/');
        setForum(response.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

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
        <Form>
          <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Add Images</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {forum.comments.map((comment) => (
          <Card key={comment.id}>
            <Card.Header as="h5">{comment.username}</Card.Header>
            <Card.Body>
              <Card.Text>{comment.body}</Card.Text>
              {comment.image && comment.image !== 'http://localhost:8000/media/default_photo.jpg' && <Card.Title>{comment.image}</Card.Title>}
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}

