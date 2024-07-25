import { useEffect, useState, useSyncExternalStore } from 'react'
import '../App.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card'

export default function Forums () {

  const [forums, setForums] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {

        const response =  await axios.get('http://localhost:8000/forumposts/')
        const categoryResponse = await axios.get('http://localhost:8000/categories/')
        console.log(response.data)
        console.log(categoryResponse.data)
        setForums(response.data)
        setCategories(categoryResponse.data)
      }catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return(
    <div className='forumPage'>
      <h1 style={{fontSize: '40px'}}><u>Forums</u></h1>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Moto-Forums</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Moto-Media Forums
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">My Posts</Nav.Link>
                  <NavDropdown
                    title="Categories"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {categories.map((category) => (
                    <NavDropdown.Item key={category.id}>{category.name}</NavDropdown.Item>))}
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                    
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <Container className='post-cards'>
        {forums.map((forum) => (
      <Card key={forum.id}>
      <Card.Header as="h5">{forum.username}</Card.Header>
      <Card.Body>
        <Card.Title>{forum.title}</Card.Title>
        <Card.Text>
         {forum.body}
        </Card.Text>
        {forum.comments.map((comment) => (
          <Card key={comment.id}>
          <Card.Header as="h5">{comment.username}</Card.Header>
          <Card.Body>
          <Card.Text>
             {forum.body}
            </Card.Text>
            <Card.Title>{comment.image}</Card.Title>
          </Card.Body>
        </Card>
        ))}
      </Card.Body>
    </Card>
    ))}
      </Container>
    </div> 
  )
  
}