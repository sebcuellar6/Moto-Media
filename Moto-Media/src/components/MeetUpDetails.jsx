import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import MeetNav from './MeetNav.jsx'

export default function MeetUpDetails() {
  const { id } = useParams();
  const [meet, setMeet] = useState(null);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/meetups/${id}`);
        const categoryResponse = await axios.get('http://localhost:8000/categories/');
        setForum(response.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  if (!meet) {
    return <div>Loading...</div>;
  }

  return (
    <div className='forumPage'>
      <h1 style={{ fontSize: '40px' }}><u>Meet Details</u></h1>
      <MeetNav/>
      <Container className='detail-cards'>
        <Card key={meet.id}>
          <Card.Header as="h5">{meet.name}</Card.Header>
          <Card.Body>
            <Card.Title>{meet.title}</Card.Title>
            <Card.Text>{meet.description}</Card.Text>
            <img className='meet-image' src={meet.main_image} alt="Forum" />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}