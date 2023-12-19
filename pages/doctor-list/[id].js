import React, {useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { getCookie } from 'cookies-next';

const DoctorListPage = (props) => {
    const [doctorList, setDoctorList] = useState([])

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        fetch(`${[process.env.API_URL]}/doctors`, {
            headers: {
                Authorization: getCookie('token')
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                alert('Something went wrong')
            }
        }).then((data) => {
            console.log(data)
            setDoctorList(data)
        }).catch((err) => {
            console.log(err)
            alert('Something went wrong')
        })
    }, [])

    const makeAppointment = (doctorId) => {
        fetch(`${[process.env.API_URL]}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('token')
            },
            body: JSON.stringify({
                doctorUid: doctorId,
                predictionid: id
            })
        }).then((res) => {
            if (res.status === 200) {
                router.push('/appoinment')
            } else {
                alert('Something went wrong')
            }
        }).catch((err) => {
            console.log(err)
            alert('Something went wrong')
        })
    }

    return (
        <Container className='doctor-container'>
            <h4 style={{
                fontWeight:'600',
                marginLeft:'12px'
            }}
                className='mb-4 mt-4'
            >Create An Appoinment</h4>
                {doctorList.map((entry, index) => (
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
                                <img src="/default-avatar.jpg"
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
                                    onClick={() => makeAppointment(entry.uid)}
                                    >Create Appoinment <FontAwesomeIcon icon={faArrowRight} style={{color: "white",width:"15px", height:"15px", marginLeft:'2px'}}/></Button>
                            </div>
                        </div>
                    </div>  
                ))}
        </Container>
    );
};

export default DoctorListPage;
