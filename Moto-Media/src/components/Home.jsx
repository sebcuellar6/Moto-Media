import '../App.css'
import Carousel from 'react-bootstrap/Carousel';
import HomeMoto from '../photos/HomeMoto.drawio.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'



export default function Home () {

  const [forums, setForums] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {

        const response =  await axios.get('http://localhost:8000/forumposts/')
        console.log(response.data)
        setForums(response.data)
      }catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])


  return(
    <div className='heroPage'>
      <Carousel className='home-carousel' style={{paddingBottom: '10px'}}>
        <Carousel.Item>
          <img
            style={{ width: '600px', height: '500px' }}
            className='d-block w-100'
            src={HomeMoto}
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>Kendrick Lamar</h3>
            <p>Coming Soon</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: '600px', height: '500px' }}
            className='d-block w-100'
            src={HomeMoto}
            alt='Second slide'
          />
          <Carousel.Caption>
            <h3>Eminem</h3>
            <p>Coming Soon</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: '600px', height: '500px' }}
            className='d-block w-100'
            src={HomeMoto}
            alt='Third slide'
          />
          <Carousel.Caption>
            <h3>Jay-Z</h3>
            <p>Coming Soon</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className='home-card' style={{paddingTop: '30px'}}>
        <Row><h1 style={{textAlign: 'left', paddingBottom: '20px'}}>Latest posts...</h1></Row>
        <Row>
          {forums.map((forum) => (
            <Col xs={12} md={6} lg={4} key={forum.id} className="d-flex align-items-stretch">
              <Card border="primary" style={{ width: '25rem', margin: '0' }}>
                <Card.Header>{forum.title}</Card.Header>
                <Card.Body>
                  <Card.Title>{forum.username}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
