import React from 'react';

import { Button, Nav, Navbar, NavDropdown, Form, FormControl, Badge  } from 'react-bootstrap';
import {Link, useLocation } from 'react-router-dom'

const NavbarComp = ({totalItems}) => {
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg"  >
      <Navbar.Brand href="#home">
        <img alt="" src="/ecommerce.png" width="30" height="30" className="d-inline-block align-top" />{' '}
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home"><Link to='/'> Home </Link></Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          {location.pathname === '/' &&(

            <Link to='/cart'>
            <Button variant="outline-success">
              cart <Badge variant="dark">{totalItems}</Badge> 
              <span className="sr-only">unread messages</span>
            </Button>
            </Link>

          )}
          
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComp


