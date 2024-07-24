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

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/forums">Forums</Nav.Link>
          <Nav.Link as={Link} to="/meetups">Meet-ups</Nav.Link>
          <Nav.Link as={Link} to="/messages">Messages</Nav.Link>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Nav>
        {!isLoading && isAuthenticated && (
          <Navbar.Text>
            Signed in as: <a href="#login">{user.nickname || user.name}</a>
          </Navbar.Text>
        )}
      </Container>
    </Navbar>
  );
}

export default MainNavBar;

