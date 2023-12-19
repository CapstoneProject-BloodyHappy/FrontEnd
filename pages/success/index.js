import React, {useState} from 'react';
import { useRouter } from 'next/router'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';

const PredictPage = () => {

    return (
        <Container className='loading-container'>
            <Image src="checkmark.gif" roundedCircle className='profile-img' />

            <p style={{
                fontSize:"18px",
                fontWeight:'600'
            }}>Doctor Found! Your path to wellness begins here</p>
            <p>Get ready for personalized care and a healthier, happier you with Bloody Happy</p>
        </Container>
    );
};

export default PredictPage;
