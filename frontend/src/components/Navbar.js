import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Sistema de Inventario CIMCO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <LinkContainer to="/">
                <Nav.Link>Productos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products/new">
                <Nav.Link>Agregar Producto</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/transactions">
                <Nav.Link>Transacciones</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/transactions/new">
                <Nav.Link>Agregar Transaccion</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/suppliers/new">
                <Nav.Link>Agregar proveedor</Nav.Link>
            </LinkContainer>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
