import '../App.css';
import Carousel from 'react-bootstrap/Carousel';
import HomeMoto from '../photos/HomeMoto.drawio.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [forums, setForums] = useState([]);
  const [meets, setMeets] = useState([]);
  let navigate = useNavigate();

  const handleForumClick = (id) => {
    navigate(`/forum-details/${id}`);
  };

  const handleMeetClick = (id) => {
    navigate(`/meetups/${id}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/forumposts/');
        const meetResponse = await axios.get('http://localhost:8000/meetups/');
        console.log(response.data);

        // Sort forums by created_at in ascending order
        const sortedForums = response.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        setForums(sortedForums);
        setMeets(meetResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className='heroPage'>
      <Carousel className='home-carousel' style={{ paddingBottom: '10px' }}>
        {meets.map((meet) => (
          <Carousel.Item key={meet.id} onClick={() => handleMeetClick(meet.id)}> 
            <img
              style={{ width: '600px', height: '500px' }}
              className='d-block w-100'
              src={meet.main_image}
              alt='First slide'
            />
            <Carousel.Caption>
              <h3>{meet.name}</h3>
              <p>{meet.location}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container className='home-card' style={{ paddingTop: '30px' }}>
        <Row>
          <h1 style={{ textAlign: 'left', paddingBottom: '20px' }}>Latest posts...</h1>
        </Row>
        <Row>
          {forums.map((forum) => (
            <Col xs={12} md={6} lg={4} key={forum.id} className="d-flex align-items-stretch home-col">
              <Card border="primary" style={{ width: '25rem', margin: '0' }} className='home-card' onClick={() => handleForumClick(forum.id)}>
                <Card.Header className='home-header'>{forum.username}</Card.Header>
                <Card.Body className='home-body'>
                  <Card.Title className='home-card-title'>{forum.title}</Card.Title>
                  <Card.Text>
                    {forum.body}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
