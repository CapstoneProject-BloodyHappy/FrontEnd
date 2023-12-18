import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleSexChange = (e) => {
        setSex(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={6} md={4}>
                    <Image src="/default-avatar.jpg" roundedCircle width={400} />
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleEmailChange} />
                        </Form.Group>
                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" value={age} onChange={handleAgeChange} />
                        </Form.Group>
                        <Form.Group controlId="formSex">
                            <Form.Label>Sex</Form.Label>
                            <Form.Control as="select" value={sex} onChange={handleSexChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;