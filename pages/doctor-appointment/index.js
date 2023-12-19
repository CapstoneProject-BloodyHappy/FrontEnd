import React from 'react';
import { useRouter } from 'next/router'
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

const appoinment_list = [
    {
        name: "Arik",
        age: 18,
        sex: "Male",
        status: 'rejected',
        predictionId : "adwadawd"
    },
    {
        name: "Arik",
        age: 18,
        sex: "Male",
        status: 'accepted',
        predictionId : "adwadawd"
    },
    {
        name: "Arik",
        age: 18,
        sex: "Male",
        status: 'pending',
        predictionId : "adwadawd"
    },
]

const DoctorAppointment = () => {

    const router = useRouter();

	return (
        <Container className='doctor-container'>
            <h4 style={{
                fontWeight:'600',
                marginLeft:'12px'
            }}
                className='mb-4 mt-4'
            >Appointment List</h4>
                {appoinment_list.map((entry, index) => (
                    <div
                        className='doctor-appoinment-card'
                        onClick={() => router.push(`/doctor-appointment/detail/${entry.predictionId}`)}
                    >
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
                                    >{entry.name}</p>
                                    <p className='mt-0 mb-0'>{entry.age} y.o, {entry.sex}</p>
                                </div>
                                <div>
                                    {
                                        entry.status == "rejected" ?
                                        <Button
                                        className='mt-3 mb-2'
                                        style={{
                                            backgroundColor: "#DC2228",
                                            border: '1px solid #DC2228',
                                            maxWidth:'250px'
                                        }}
                                        >Reject</Button>
                                        : entry.status == "accepted" ?
                                        <Button
                                        style={{
                                            backgroundColor: "#DC2228",
                                            border: '1px solid #DC2228',
                                            maxWidth:'250px'
                                        }}
                                        >Accept</Button> :
                                        <div>
                                            <Button
                                            className=' me-2'
                                            style={{
                                                backgroundColor: "#DC2228",
                                                border: '1px solid #DC2228',
                                                maxWidth:'250px'
                                            }}
                                            >Reject</Button>
                                            <Button
                                            style={{
                                                backgroundColor: "#299644",
                                                border: '1px solid #299644',
                                                maxWidth:'250px'
                                            }}
                                            >Accept</Button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>  
                ))}
        </Container>
	);
}

export default DoctorAppointment;
