import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next';

const Detail = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [details, setDetails] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (props.userdata) {
            setUserData(props.userdata);
            console.log(props.userdata);
        }
    }, [props.userdata]);

    const user_data =
        {
            'Date':'2023-12-18',
            'Result' : 'Anemia',
            'Name' : 'Arik Rayi',
            'Age' : 20,
            'Sex': 'male'
        }

    const formatDate = (dateString) =>{
        const dateObj = new Date(dateString);

        const day = dateObj.getUTCDate().toString().padStart(2, '0');
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getUTCFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        return formattedDate;
    }

    useEffect(() => {
        if (id) {
            fetch(`${process.env.API_URL}/predict/${id}`, {
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
                setDetails(data)
            }
            );
        }
    }, [id]);
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
                    >{formatDate(details.date)}</h3>
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
                                <img src={details.photoUrl} 
                                style={{
                                    width:"100%",
                                    height:"100%",
                                    borderRadius:"10px",
                                }}
                            />
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
                                : {userData.name}
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <span style={{ display: 'inline-block', width: '80px' }}>Age</span>
                                : {userData.age}
                            </li>
                            <li>
                                <span style={{ display: 'inline-block', width: '80px' }}>Sex</span>
                                : {userData.sex}
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
                               {details.result}
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
                                {details.recommendation}
                            </p>
                        </div>
                </div>
            </div>
        </Container>
    );
};

export default Detail;
