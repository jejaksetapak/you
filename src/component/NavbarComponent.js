import React from 'react'
import './NavbarComponent.css';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  Offcanvas, Image
} from 'react-bootstrap';
import Logo from "../assets/logo.webp"
function NavbarComponent() {
  return (
    <Navbar expand="lg" className="mb-3 nav-bar-home">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/"><Image className="img-logo" src={Logo} /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              <Image className="img-logo-canvas" src={Logo} />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav className="nav-link"><Link to="/" className="menu-link">Home</Link></Nav>
              <Nav className="nav-link"><Link to="/brand" className="menu-link">List Image</Link></Nav>
              <Nav className="nav-link"><Link to="/insurance" className="menu-link">List Insurance Brand</Link></Nav>
            </Nav>
          
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent