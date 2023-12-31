import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import useAuth from '../../../src/libs/useAuth';

const ProfilePage = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    useEffect(() => {
        const user = JSON.parse(getCookie('user'));
        setPhotoURL(user.photoURL);
        setEmail(user.email);

        fetch(`${process.env.API_URL}/profile`, {
            headers: {
                'Authorization': getCookie('token'),
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Error fetching profile');
            }
        }).then((user) => {
            setName(user.name);
            setAge(user.age);
            setSex(user.sex);
        });
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleSexChange = (e) => {
        setSex(e.target.value);
    };

    const handleAgeKeyDown = (event) => {

        if (event.key === 'Tab' || event.key === 'Backspace' || event.key === 'Delete') {
            return;
        }

        if (!/^[0-9]+$/.test(event.key)) {
            event.preventDefault();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !age || !sex) {
            alert('Please fill in all fields');
            return;
        }
        fetch(`${process.env.API_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token'),
            },
            body: JSON.stringify({
                name,
                email,
                age,
                sex
        })}).then((res) => {
            if (res.status === 200) {
                res.json().then(() => {
                    router.push('/profile');
                });
            } else {
                alert('Error editing user');
            }
        }).catch((err) => {
            console.error(err);
            alert('Error editing user');
        })
    };

    return (
        <Container>
            <div className="d-flex flex-column align-items-center image-container">
                <Image src={photoURL} roundedCircle className='profile-img' />
            </div>
            <Row className="justify-content-center mt-2">
                <Col xs={12} md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} disabled/>
                        </Form.Group>
                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" value={age} onKeyDown={handleAgeKeyDown} onChange={handleAgeChange} />
                        </Form.Group>
                        <Form.Group controlId="formSex">
                            <Form.Label>Sex</Form.Label>
                            <Form.Control as="select" value={sex} onChange={handleSexChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className='mt-4'>Save Changes</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;