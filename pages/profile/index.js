import React from 'react';
import { useRouter } from 'next/router'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const ProfilePage = () => {
    const router = useRouter();

    const userData ={
        'name' : 'Arik Rayi',
        'email' : 'arik@gmail.com'
    }
    return (
        <Container>
            <div className="d-flex flex-column align-items-center image-container">
                <Image src="/default-avatar.jpg" roundedCircle className='profile-img' />
                    <h2>{userData.name}</h2>
                    <p>{userData.email}</p>
            </div>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={8}>
                    <p>Age: 25</p>
                    <p>Sex: Male</p>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={8}>
                    <Button variant="primary" onClick={() => router.push('/profile/edit')}>Edit Profile</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
