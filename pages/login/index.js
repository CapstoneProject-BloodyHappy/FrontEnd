import Head from 'next/head';
import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import useAuth from '../../src/libs/useAuth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const auth = useAuth();

    return (
        <Container className="mt-5 d-flex">
            <Row className="d-flex flex-column"
                style={{
                    width:'50%'
                }}
            >
                    <div style={{
                        width:'60%'
                    }}>
                        <h2 className='text-left'
                            style={{
                                color:"#DC2228",
                                fontWeight:"700",
                                fontSize:"76px"
                            }}
                        >Bloody Happy !</h2>

                        <p className='mt-5 mb-1'
                            style={{
                                fontWeight:"700",
                                fontSize:"20px"
                            }}
                        >
                            See beyond the surface
                        </p>
                        <p className='mt-0'
                            style={{
                                fontSize:"20px"
                            }}
                        >
                            Your app for predicting anemia through the eyes. A glimpse into your health, a step towards a happier, healthier you!
                        </p>
                    </div>

                    <Button variant="outline-primary" onClick={auth.loginWithGoogle}
                        style={{
                            width:'30%',
                            marginLeft:'12px',
                            marginTop:'auto'
                        }}
                    >
                    Login with Google
                    </Button>

                    {error && <Alert variant="danger">{error}</Alert>}
            </Row>
            <Row
                style={{
                    width:'50%'
                }}
            >
                <div className='d-flex justify-content-between ms-auto'
                    style={{
                        width:"50%",
                        marginRight:"20%"
                    }}
                >
                    <div style={{
                        width:"40px",
                        height:"40px",
                        backgroundColor:"#9e181c",
                        borderRadius: "50%"
                    }}></div>
                    <div style={{
                        width:"40px",
                        height:"40px",
                        backgroundColor:"#9e181c",
                        borderRadius: "50%"
                    }}></div>
                </div>
                <img src="/blood_cell2.png" alt="Blood Cell Img"
                    style={{
                        width:"90%"
                    }}
                    className='ms-5'
                />;
            </Row>
        </Container>
    );
};

export default LoginPage;
