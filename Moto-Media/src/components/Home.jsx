import '../App.css'
import Carousel from 'react-bootstrap/Carousel';
import HomeMoto from '../photos/HomeMoto.drawio.png'
import Container from 'react-bootstrap/Container'
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
      <h1 style={{fontSize: '40px'}}><u>Home</u></h1>
      <Carousel>
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
      <Container className='home-card'>
        {forums.map((forum) => (

          <Card border="primary" style={{ width: '18rem' }} key={forum.id}>
          <Card.Header>{forum.username}</Card.Header>
          <Card.Body>
            <Card.Title>{forum.title}</Card.Title>
            <Card.Text>
              {forum.body}
            </Card.Text>
          </Card.Body>
        </Card>

        ))}

      </Container>
      
    </div> 
  )
  
}