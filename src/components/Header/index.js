import React, { useState, FormEvent } from 'react';
import { Button, Col, Form, InputGroup, Row, Container, Card, Navbar, Nav, NavDropdown, Offcanvas, FormControl, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

function Header() {
    const { signout } = useAuth();

    {/* false, 'sm', 'md', 'lg', 'xl', 'xxl */ }
    const expand = 'sm'
    return (
        <>

            <Navbar key={String(expand)} bg="dark" variant='dark' expand={expand} className="mb-3">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/home">Receitas</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Receitas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-start flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/home">Home</Nav.Link>

                                <Nav.Link as={Link} to="/my-receitas">
                                    Minhas receitas
                                </Nav.Link>


                            </Nav>
                            <Nav className='justify-content-end'>
                                <Nav.Link onClick={() => signout()}>
                                    Sair
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default Header