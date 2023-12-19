import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const ProfilePage = () => {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const router = useRouter();

    const [isValidEmail, setIsValidEmail] = useState(true);

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
        fetch(`${process.env.API_URL}/create-user`, {
            method: 'POST',
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
                    router.push('/history');
                });
            } else {
                alert('Error creating user');
            }
        }).catch((err) => {
            console.error(err);
            alert('Error creating user');
        })
    };

    useEffect(() => {
        const user = JSON.parse(getCookie('user'));
        setName(user.displayName);
        setEmail(user.email);
        setPhotoUrl(user.photoURL);
    }
    , [name, email, photoUrl]);

    return (
        <Container>
            <h1 className="text-center mt-3">Welcome new user</h1>
            <h3 className="text-center mt-3">Please fill in your profile first.</h3>
            <div className="d-flex flex-column align-items-center image-container">
                <Image src={photoUrl} roundedCircle className='profile-img' />
            </div>
            <Row className="justify-content-center mt-2">
                <Col xs={12} md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} disabled/>
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
                                <option value="">Choose Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
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