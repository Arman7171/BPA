import React from 'react';
import { Nav, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand>
                <NavLink 
                    to='/'
                    activeClassName = 'activeLink'
                >
                    <h1>BPA</h1>
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/contact' className='mx-2'>Contact</NavLink>
                    <NavLink to='/login' className='mx-2'>Login</NavLink>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;