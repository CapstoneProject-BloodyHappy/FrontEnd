import Head from 'next/head';
import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router'
// import BloodCell from "../../public/blood_cell.png"

const Detail = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const history_data =
        {
            'Date':'2023-12-18',
            'Result' : 'Anemia',
            'Name' : 'Arik Rayi',
            'Age' : 20,
            'Sex': 'male'
        }

    const formatDate = (dateString) =>{
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    }

    return (
        <Container className="mt-3">
            <div className="d-flex">
                <div
                    style={{
                        width:"20%"
                    }}
                >
                    <h3 style={{
                        fontWeight:'600'
                    }}
                        className='mb-5'
                    >{formatDate(history_data.Date)}</h3>
                </div>

                <div
                    style={{ 
                        marginBottom: '20px',
                        border:'1px solid #DC2228',
                        borderRadius:'10px',
                        marginLeft:'12px',
                        width:'70%'
                    }}
                >
                        <div
                            className="d-flex flex-column align-items-center"
                            style={{
                                width:"100%"
                            }}
                        >
                            <div
                                style={{
                                    width:"140px",
                                    height:"140px",
                                    border:'1px solid #DC2228',
                                    borderRadius:'10px',
                                }}
                                className="mt-3"
                            >
                                Image
                            </div>
                            <p
                                style={{
                                    fontSize:"18px",
                                    fontWeight:"600"
                                }}
                            >
                                Laporan Pemeriksaan
                            </p>
                        </div>

                        <div
                            style={{
                                width:"100%",
                                padding:"12px"
                            }}
                        >
                            <p
                                style={{
                                    fontSize:"16px",
                                    fontWeight:"600"
                                }}
                            >
                                Identifikasi Pasien
                            </p>
                            <ul>
                            <li style={{ marginBottom: '10px' }}>
                                <span style={{ display: 'inline-block', width: '80px' }}>Name</span>
                                : {history_data.Name}
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <span style={{ display: 'inline-block', width: '80px' }}>Age</span>
                                : {history_data.Age}
                            </li>
                            <li>
                                <span style={{ display: 'inline-block', width: '80px' }}>Sex</span>
                                : {history_data.Sex}
                            </li>
                            </ul>

                            <p
                                style={{
                                    fontSize:"16px",
                                    fontWeight:"600"
                                }}
                                className='mt-3'
                            >
                                Identifikasi Pasien
                            </p>
                            <p
                                className='mt-1'
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper, est maximus congue suscipit, justo lorem finibus tellus, a elementum est risus non risus. Donec et ipsum purus. Sed ut mauris arcu. Vestibulum eu ullamcorper neque. Integer sed ipsum et ex vestibulum porttitor scelerisque dapibus elit. 
                            </p>

                            <p
                                style={{
                                    fontSize:"16px",
                                    fontWeight:"600"
                                }}
                                className='mt-3'
                            >
                                Rekomendasi Pasien
                            </p>
                            <p
                                className='mt-1'
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper, est maximus congue suscipit, justo lorem finibus tellus, a elementum est risus non risus. Donec et ipsum purus. Sed ut mauris arcu. Vestibulum eu ullamcorper neque. Integer sed ipsum et ex vestibulum porttitor scelerisque dapibus elit. 
                            </p>
                        </div>
                </div>
            </div>
        </Container>
    );
};

export default Detail;
