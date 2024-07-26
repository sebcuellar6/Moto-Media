import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import ForumNav from './ForumNav';

export default function Forums() {
  const [forums, setForums] = useState([]);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

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

  const handlePostClick = () => navigate(`/forum-post`)
  const handleForumClick = (id) => navigate(`/forum-details/${id}`);

  return (
    <div className='forumPage'>
      <h1 style={{ fontSize: '40px' }}><u>Forums</u></h1>
      <ForumNav categories={categories} />
      <Button variant="primary" onClick={handlePostClick}>Post +</Button>{' '}
      <Container className='post-cards'>
        {forums.map((forum) => (
          <Card key={forum.id} onClick={() => handleForumClick(forum.id)}>
            <Card.Header as="h5">{forum.username}</Card.Header>
            <Card.Body>
              <Card.Title>{forum.title}</Card.Title>
              <Card.Text>{forum.body}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}

