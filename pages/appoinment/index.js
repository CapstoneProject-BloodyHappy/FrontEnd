import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { getCookie } from 'cookies-next';

const Appointment = (props) => {
    const router = useRouter()
    const [appointmentList, setAppointmentList] = useState([])

    useEffect(() => {
        fetch(`${[process.env.API_URL]}/appointments`, {
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
            setAppointmentList(data)
        }
        ).catch((err) => {
            console.log(err)
            alert('Something went wrong')
        })
    }, [])

	return (
        <Container className='doctor-container'>
            <h4 style={{
                fontWeight:'600',
                marginLeft:'12px'
            }}
                className='mb-4 mt-4'
            >Appointment List</h4>
                {appointmentList.map((entry, index) => (
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
                                    >{entry.doctor.name}</p>
                                    <p className='mt-0 mb-0'>{entry.doctor.hospital}</p>
                                </div>
								<div className='d-flex mt-1 align-items-center'
									style={{
										width:"100%"
									}}
								>
									{
										entry.appointment.status === "pending" ?
										<FontAwesomeIcon icon={faClock} style={{color: "#caca00",}} /> :
											entry.appointment.status === "accepted" ?
											<FontAwesomeIcon icon={faCheck} style={{color: "#00ff40",}} /> :
											<FontAwesomeIcon icon={faCircleXmark} style={{color: "#ff0000",}} />
									}
									<p className='mt-0 mb-0 ms-1'>{entry.appointment.status}</p>
								</div>
                            </div>
                        </div>
                    </div>  
                ))}
        </Container>
	);
};

export default Appointment;
