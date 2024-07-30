import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import ForumNav from './ForumNav';
import levenshtein from 'js-levenshtein';

export default function Forums() {
  const [forums, setForums] = useState([]);
  const [filteredForums, setFilteredForums] = useState([]);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/forumposts/');
        const categoryResponse = await axios.get('http://localhost:8000/categories/');
        setForums(response.data);
        setFilteredForums(response.data); // Initialize filteredForums with all forums
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handlePostClick = () => navigate(`/forum-post`);
  const handleForumClick = (id) => navigate(`/forum-details/${id}`);
  
  const handleForumDelete = async (id, event) => {
    event.stopPropagation(); // Prevents the Card onClick from firing
    try {
      await axios.delete(`http://localhost:8000/forums/${id}`);
      setForums(forums.filter((forum) => forum.id !== id));
      setFilteredForums(filteredForums.filter((forum) => forum.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleForumEdit = (id, event) => {
    event.stopPropagation(); // Prevents the Card onClick from firing
    navigate(`/update-forum/${id}`);
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = forums.filter((forum) => {
      const titleDistance = levenshtein(forum.title.toLowerCase(), lowercasedQuery);
      const bodyDistance = levenshtein(forum.body.toLowerCase(), lowercasedQuery);
      return titleDistance < 10 || bodyDistance < 10; // You can adjust the threshold as needed
    });
    setFilteredForums(filtered);
  };

  return (
    <div className='forumPage'>
      <h1 style={{ fontSize: '40px' }}><u>Forums</u></h1>
      <ForumNav categories={categories} onSearch={handleSearch} />
      
      <Container className='full-width-container'>
        {filteredForums.map((forum) => (
          <Card className='forum-card' key={forum.id} onClick={() => handleForumClick(forum.id)}>
            <Card.Header as="h5">{forum.username}</Card.Header>
            <Card.Body>
              <Card.Title>{forum.title}</Card.Title>
              <Card.Text>{forum.body}</Card.Text>
              <Button variant="danger" onClick={(event) => handleForumDelete(forum.id, event)}>Delete</Button>{' '}
              <Button variant="warning" onClick={(event) => handleForumEdit(forum.id, event)}>Edit</Button>{' '}
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}





