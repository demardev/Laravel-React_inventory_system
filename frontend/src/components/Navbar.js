import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavigationBar() {

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand className="text-white mx-3" href="/">Sistema de Inventario CIMCO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <LinkContainer to="/">
                        <Nav.Link className="text-white">Productos</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/products/new">
                        <Nav.Link className="text-white">Agregar Producto</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/transactions">
                        <Nav.Link className="text-white">Transacciones</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/transactions/new">
                        <Nav.Link className="text-white">Agregar Transacción</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/suppliers/new">
                        <Nav.Link className="text-white">Agregar Proveedor</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
