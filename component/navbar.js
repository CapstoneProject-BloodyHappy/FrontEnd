import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import useAuth from '../src/libs/useAuth';
import Link from 'next/link'

const Bottom_Navbar = (props) => {
    const auth = useAuth();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (props.userdata) {
            setUserData(props.userdata);
        }
    }, [props.userdata]);
    
    return (
        <Navbar expand="lg" className="navbar-custom"  sticky="bottom" fixed="top"
            style={{
                width:"100%",
            }}
        >
            <Container>
            <div
                className='navbar-brand-custom'
            ><Link href="/">Bloody Happy</Link></div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                { (auth.user && userData && userData.role === 'user') &&
                    <Nav className="me-auto">
                        <Nav.Link><Link href="/history">History</Link></Nav.Link>
                        <Nav.Link><Link href="/appoinment">Appoinment</Link></Nav.Link>
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
