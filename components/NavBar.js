/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="NavBarBackground">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image
              src="/logo.svg"
              width={160}
              height={40}
              alt="GiveLife"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link style={{ color: 'white' }}>Home</Nav.Link>
            </Link>
            <Link passHref href="/userProfile">
              <Nav.Link style={{ color: 'white' }}>User Profile</Nav.Link>
            </Link>
            <Button variant="danger" className="SignOut" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
