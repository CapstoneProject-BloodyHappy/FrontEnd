import React from 'react';
import { useRouter } from 'next/router'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

const ProfilePage = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    useEffect(() => {
        const user = JSON.parse(getCookie('user'));

        setEmail(user.email);
        setPhotoURL(user.photoURL);

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
    }, [name, email, age, sex, photoURL]);

    return (
        <Container>
            <div className="d-flex flex-column align-items-center image-container">
                <Image src={photoURL} roundedCircle className='profile-img' />
                    <h2>{name}</h2>
                    <p>{email}</p>
            </div>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={8}>
                    <p>Age: {age}</p>
                    <p>Sex: {sex}</p>
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
