import Head from 'next/head';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import useAuth from '../src/libs/useAuth';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import Link from 'next/link'

const Bottom_Navbar = () => {
    const auth = useAuth();

    
    return (
        <Navbar expand="lg" className="navbar-custom"  sticky="bottom" fixed="top"
            style={{
                width:"100%",
            }}
        >
            <Container>
            <div
                className='navbar-brand-custom'
            >Bloody Happy</div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                { (auth.user) &&
                    <Nav className="me-auto">
                        <Nav.Link><Link href="/history">History</Link></Nav.Link>
                        <Nav.Link><Link href="/predict">Predict</Link></Nav.Link>
                        <Nav.Link><Link href="/chat">Chat</Link></Nav.Link>
                        <Nav.Link><Link href="/profile">Profile</Link></Nav.Link>
                    </Nav>
                }
            </Navbar.Collapse>
            { (auth.user) &&
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button variant="outline-light" onClick={() => auth.handleSignOut()}>Logout</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            }
            </Container>
        </Navbar>
    );
};

export default Bottom_Navbar;
