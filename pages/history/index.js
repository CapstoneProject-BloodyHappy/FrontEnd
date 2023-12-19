import Head from 'next/head';
import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router'
// import BloodCell from "../../public/blood_cell.png"

const History = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const history_data = [
        {
            'Date':'2023-12-18',
            'Result' : 'Anemia'
        },
        {
            'Date':'2023-12-18',
            'Result' : 'Non Anemia'
        },
        {
            'Date':'2023-12-18',
            'Result' : 'Anemia'
        },
        {
            'Date':'2023-12-18',
            'Result' : 'Non Anemia'
        },
        {
            'Date':'2023-12-18',
            'Result' : 'Anemia'
        },
        {
            'Date':'2023-12-18',
            'Result' : 'Non Anemia'
        },
                {
            'Date':'2023-12-18',
            'Result' : 'Anemia'
        },
        {
            'Date':'2023-12-18',
            'Result' : 'Non Anemia'
        },
    ]

    const formatDate = (dateString) =>{
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    }

    return (
        <Container className="mt-3 d-flex">
            <Row>
                <h3 style={{
                    fontWeight:'600'
                }}
                    className='mb-4 mt-2'
                >History</h3>

                {history_data.map((entry, index) => (
                    <div key={index} 
                        className="d-flex history-card"
                        onClick={() => router.push('/history/detail')}
                    >
                        <div
                            style={{
                                width:"70px",
                                maxWidth:"70px"
                            }}
                        >
                            Image
                        </div>
                        <div style={{
                            marginTop:'auto',
                            marginBottom:'auto'
                        }}>
                            <p className='mt-0 mb-0'
                                style={{
                                    fontSize:"18px",
                                    fontWeight:"600"
                                }}
                            >{formatDate(entry.Date)}</p>
                            <p className='mt-0 mb-0'>Prediciton : {entry.Result}</p>
                        </div>
                    </div>
                ))}

                    <Button variant="outline-danger"
                        style={{
                            marginLeft:'12px',
                            marginTop:'20px',
                            fontWeight:'700'
                        }}
                    >
                        Clear History
                    </Button>
            </Row>
        </Container>
    );
};

export default History;
