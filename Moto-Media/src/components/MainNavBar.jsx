import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

function MainNavBar() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Display username or email, if available
  const userName = user?.nickname || user?.name || user?.email || 'User';

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className='nav-title'>Moto-Media</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/forums">Forums</Nav.Link>
          <Nav.Link as={Link} to="/meetups">Meet-ups</Nav.Link>
          <Nav.Link as={Link} to="/messages">Messages</Nav.Link>
          
        </Nav>
        {!isLoading && isAuthenticated && (
          <Navbar.Text>
            Signed in as: <a href="#profile">{userName}</a>
          </Navbar.Text>
        )}
      </Container>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Navbar>
  );
}

export default MainNavBar;


