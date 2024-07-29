import '../App.css'
import MeetNav from './MeetNav'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from '../photos/placeholder2.png'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ListGroup from 'react-bootstrap/ListGroup';

export default function MeetUps () {

  const [events, setEvents] = useState([])
  let navigate = useNavigate()

  useEffect(() => {

    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/meetups/')
        setEvents(response.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    console.log(events)
  }, [])

  const handlePostClick = () => navigate('/meetups-post/')

  return(
    <div className='heroPage'>
      <h1 style={{fontSize: '40px'}}><u>Meet Ups</u></h1>
      <MeetNav />
      <Button variant="primary" onClick={handlePostClick}>Post +</Button>{' '}
      <Container>
        <Row>
        {events.map((event) => (
            <Col key={event.id} xs={12} md={6} lg={4}>
              <Card className='meet-cards' style={{ width: '100%' }}>
                <Card.Img variant="top" src={Placeholder} />
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>
                    {event.description}
                  </Card.Text>
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
          <Col xs={12} md={6} lg={4}>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={Placeholder} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
