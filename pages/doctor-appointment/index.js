import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Container, Button } from 'react-bootstrap';
import { getCookie } from 'cookies-next';

const DoctorAppointment = () => {
    const router = useRouter();
    const [appoinmentList, setAppoinmentList] = useState([])

    const fetchAppointments = () => {
        fetch(`${process.env.API_URL}/appointments`, {
            headers: {
                Authorization: getCookie('token'),
            },
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then((data) => {
            setAppoinmentList(data);
        })
        .catch((err) => {
            console.error(err);
            alert('Something went wrong');
        });
    };

    const acceptAppointment = (e, id) => {
        fetch(`${process.env.API_URL}/appointments`, {
            method: 'PATCH',
            headers: {
                Authorization: getCookie('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                consultationid: id,
                status: 'accepted',
            }),
        }).then((res) => {
            if (res.status === 200) {
                alert('Appointment accepted');
                fetchAppointments();
                return;
            } else {
                alert('Something went wrong');
            }
        }).catch((err) => {
            console.log(err);
            alert('Something went wrong');
        });
    }

    const rejectAppointment = (e, id) => {
        fetch(`${process.env.API_URL}/appointments`, {
            method: 'PATCH',
            headers: {
                Authorization: getCookie('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                consultationid: id,
                status: 'rejected',
            }),
        }).then((res) => {
            if (res.status === 200) {
                alert('Appointment rejected');
                fetchAppointments();
                return
            } else {
                alert('Something went wrong');
            }
        }).catch((err) => {
            console.log(err);
            alert('Something went wrong');
        });
    }

    useEffect(() => {
        fetch(`${process.env.API_URL}/appointments`, {
            headers: {
                Authorization: getCookie('token'),
            },
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Something went wrong');
            }
        }).then((data) => {
            if (data) {
                setAppoinmentList(data);
            }
        }).catch((err) => {
            console.log(err);
            alert('Something went wrong');
        }
        );
    }
    , []);


	return (
        <Container className='doctor-container'>
            <h4 style={{
                fontWeight:'600',
                marginLeft:'12px'
            }}
                className='mb-4 mt-4'
            >Appointment List</h4>
                {appoinmentList.map((entry, index) => (
                    <div
                        className='doctor-appoinment-card'
                    >
                        <div key={index}
                            className="d-flex docter-card align-items-center"
                        >
                            <div className='d-flex detail-card'
                                style={{
                                    width: "80%",
                                }}
                                onClick={() => router.push(`/doctor-appointment/detail/${entry.appointment.predictionid}`)}
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
                                    marginBottom:'auto',
                                    width:"90%"
                                }}
                                    className='d-flex justify-content-between align-items-center'
                                >
                                    <div>
                                        <p className='mt-0 mb-0'
                                            style={{
                                                fontSize:"18px",
                                                fontWeight:"600"
                                            }}
                                        >{entry.user.name}</p>
                                        <p className='mt-0 mb-0'>{entry.user.age} y.o, {entry.user.sex}</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    height:"max-content",
                                    marginLeft:"auto"
                                }}
                            >
                                {
                                    entry.appointment.status == "rejected" ?
                                    <div
                                    >
                                        <Button
                                        style={{
                                            backgroundColor: "#299644",
                                            border: '1px solid #299644',
                                            maxWidth:'250px'
                                        }}
                                        onClick={(e) => acceptAppointment(e, entry.appointment.id)}
                                        >Accept</Button>
                                    </div>
                                    : entry.appointment.status == "accepted" ?
                                    <div>
                                        <Button
                                        style={{
                                            backgroundColor: "#DC2228",
                                            border: '1px solid #DC2228',
                                            maxWidth:'250px'
                                        }}
                                        onClick={(e) => rejectAppointment(e, entry.appointment.id)}
                                        >Reject</Button>
                                    </div> :
                                    <div>
                                        <Button
                                        className='me-2'
                                        style={{
                                            backgroundColor: "#DC2228",
                                            border: '1px solid #DC2228',
                                            maxWidth:'250px'
                                        }}
                                        onClick={(e) => rejectAppointment(e, entry.appointment.id)}
                                        >Reject</Button>
                                        <Button
                                        style={{
                                            backgroundColor: "#299644",
                                            border: '1px solid #299644',
                                            maxWidth:'250px'
                                        }}
                                        onClick={(e) => acceptAppointment(e, entry.appointment.id)}
                                        >Accept</Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>  
                ))}
        </Container>
	);
}

export default DoctorAppointment;
