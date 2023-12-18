import React from 'react';
import { useRouter } from 'next/router'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const ProfilePage = () => {
    const router = useRouter();
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={6} md={4}>
                    <Image src="/default-avatar.jpg" roundedCircle width={400} />
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={8}>
                    <h2>Name</h2>
                    <p>Email: example@example.com</p>
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
