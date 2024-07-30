import '../App.css';
import MeetNav from './MeetNav';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from '../photos/placeholder2.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export default function MeetUps() {
  const [events, setEvents] = useState([]);
  const [expanded, setExpanded] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/meetups/');
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log(events);
  }, []);

 

  const toggleDescription = useCallback((id) => {
    setExpanded(expanded === id ? null : id);
  }, [expanded]);

  return (
    <div className='heroPage'>
      <h1 style={{ fontSize: '40px' }}><u>Meet Ups</u></h1>
      <MeetNav />
     
      <Container fluid>
        <Row className="g-3">
          {events.map((event) => (
            <Col key={event.id} xs={12} md={6} lg={4}>
              <Card className='meet-cards' style={{ width: '100%', marginBottom: '20px' }}>
                <Card.Img variant="top" src={Placeholder} />
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <div className={`card-description-container ${expanded === event.id ? 'full' : ''}`}>
                    <Card.Text className={`card-description ${expanded === event.id ? 'full' : ''}`}>
                      {event.description}
                    </Card.Text>
                  </div>
                  <Button
                    variant="link"
                    onClick={() => toggleDescription(event.id)}
                  >
                    {expanded === event.id ? 'Show Less' : 'Read More'}
                  </Button>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <Form.Check
                      type="checkbox"
                      label="Invite Only"
                      checked={event.invite_only}
                      readOnly
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Skill Level: {event.skill_level}</ListGroup.Item>
                  <ListGroup.Item>Type of Ride: {event.type}</ListGroup.Item>
                  <ListGroup.Item>Location: {event.location}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}



