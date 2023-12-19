import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next';

const History = () => {
    const router = useRouter();
    

    const [historyData, setHistoryData] = useState([])

    useEffect(() => {
        fetch(`${process.env.API_URL}/predictionsByUID`, {
            headers: {
                'Authorization': getCookie('token'),
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if (res.status === 401) {
                router.push('/login');
            }
            else {
                alert('Error fetching profile');
            }
        }).then((data) => {
            setHistoryData(data)
        }
        );
    }, []);


    const formatDate = (dateString) =>{
        const dateObj = new Date(dateString);

        const day = dateObj.getUTCDate().toString().padStart(2, '0');
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getUTCFullYear();

        const formattedDate = `${day}-${month}-${year}`;

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

                {historyData.map((entry, index) => (
                    <div key={index} 
                        className="d-flex history-card"
                        onClick={() => router.push('/history/detail')}
                    >
                        <div
                            style={{
                                width:"100px",
                                height:"100px",
                                maxWidth:"100px",
                                marginRight: '10px'
                            }}
                        >
                            <img src={entry.photoUrl} 
                                style={{
                                    width:"100%",
                                    height:"100%",
                                    borderRadius:"10px",
                                }}
                            />
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
                            >{formatDate(entry.date)}</p>
                            <p className='mt-0 mb-0'>Prediciton : {entry.result}</p>
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
