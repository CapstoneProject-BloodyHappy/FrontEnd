import React, {useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

const DoctorListPage = (props) => {

    const router = useRouter();
    const { id } = router.query;

    const doctor = [
        {
            name: "Dr. Arik Rayi",
            hospital: "Primaya Bekasi"
        },
        {
            name: "Dr. Arik Rayi",
            hospital: "Primaya Bekasi"
        },
        {
            name: "Dr. Arik Rayi",
            hospital: "Primaya Bekasi"
        },
        {
            name: "Dr. Arik Rayi",
            hospital: "Primaya Bekasi"
        }
    ]

    return (
        <Container className='doctor-container'>
            <h4 style={{
                fontWeight:'600',
                marginLeft:'12px'
            }}
                className='mb-4 mt-4'
            >Create An Appoinment</h4>
                {doctor.map((entry, index) => (
                    <div>
                        <div key={index}
                            className="d-flex docter-card"
                        >
                            <div
                                style={{
                                    width:"100px",
                                    height:"100px",
                                    maxWidth:"100px",
                                    marginRight: '10px'
                                }}
                            >
                                <img src="default-avatar.jpg"
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
                                <div>
                                    <p className='mt-0 mb-0'
                                        style={{
                                            fontSize:"18px",
                                            fontWeight:"600"
                                        }}
                                    >{entry.name}</p>
                                    <p className='mt-0 mb-0'>{entry.hospital}</p>
                                </div>
                                <Button
                                    className='mt-3 mb-2'
                                    style={{
                                        backgroundColor: "#DC2228",
                                        border: '1px solid #DC2228',
                                        maxWidth:'250px'
                                    }}
                                    >Create Appoinment <FontAwesomeIcon icon={faArrowRight} style={{color: "white",width:"15px", height:"15px", marginLeft:'2px'}}/></Button>
                            </div>
                        </div>
                    </div>  
                ))}
        </Container>
    );
};

export default DoctorListPage;
