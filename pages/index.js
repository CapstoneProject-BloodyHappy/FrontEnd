import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrashCan, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { getCookie } from 'cookies-next';

const PredictPage = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [filename, setFileName] = useState('No Selected File');
    const [resultVisibility, setResultVisibility] = useState(false);
    const [result, setResult] = useState(null);
    const [predictionId, setPredictionId] = useState(null);

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const filePreview = URL.createObjectURL(file);
            setFilePreview(filePreview);
            setImage(file);
            setFileName(file.name);
        }
    }

    const predict = () => {
        const formData = new FormData();
        if (image) {
            formData.append('file', image);
        }
        setLoading(true);
        fetch(`${process.env.API_URL}/predict`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': getCookie('token'),
            }
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Error predicting');
            }
        }).then(data => {
            setResult(data.result);
            setPredictionId(data.id);
        });
    }

    useEffect(() => {
        if (result !== null) {
            setResultVisibility(true);
            setLoading(false);
        }
    }, [result, loading]);



    const History = () => {
        router.push('/history')
    }

    const lookForDoctor = () => {
        router.push(`/loading/${predictionId}`)
    }


    return (
        <Container className='predict-container'>
            <p className='mt-3 mb-0'
                style={{
                    fontWeight:"600",
                    fontSize:"24px"
                }}
            >Unlock the secrets of your health through your eyes</p>
            <p className='mt-0 mb-1'>Simply upload an image and let Bloody Happy reveal insights with a glance</p>
            <Form.Group controlId="formFile"className="mb-3 image-input"
                onClick={()=> document.querySelector(".input-field").click()}
            >
                <Form.Control type="file" hidden className='input-field'
                    onChange={onFileChange}
                />

                {
                    image ? 
                    <img src={filePreview} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} alt={filename}/> :
                    <div className='d-flex flex-column'>
                        <FontAwesomeIcon icon={faImage} style={{color: "#DC2228",width:"100px", height:"100px"}} />
                        <Form.Label>Select Image</Form.Label>
                    </div>
                }
            </Form.Group>

                {
                    image ? 
                    <div className='d-flex flex-column align-items-center'>
                        <div className='d-flex'>
                            <FontAwesomeIcon icon={faImage} style={{color: "#DC2228",width:"20px", height:"20px", marginRight:'10px'}} />
                            <p>{filename}</p>
                            <FontAwesomeIcon icon={faTrashCan} style={{color: "#DC2228",width:"20px", height:"20px", marginLeft:'10px'}}
                                className='delete-image'
                                onClick={()=>{
                                    setFileName("No Selected File");
                                    setImage(null);
                                    setResultVisibility(false);
                                }}
                            />
                        
                        </div>
                        <Button
                        onClick={predict}
                        style={{
                            backgroundColor: "#DC2228",
                            border: '1px solid #DC2228'
                        }}>Predict</Button>
                        { 
                            loading && 
                                <div className='mt-5 d-flex flex-column align-items-center'>
                                    <p>Loading...</p> 
                                </div>
                        }
                        {
                            resultVisibility && (
                                <div className='mt-4 d-flex flex-column align-items-center'>
                                    <div>
                                        <span
                                            style={{
                                                fontWeight:"600"
                                            }}
                                        >Prediction</span> : {result}
                                    </div>

                                    <Button
                                    className='mt-3'
                                    onClick={History}
                                    style={{
                                        backgroundColor: "#DC2228",
                                        border: '1px solid #DC2228',
                                        maxWidth:'120px'
                                    }}>History <FontAwesomeIcon icon={faArrowRight} style={{color: "white",width:"15px", height:"15px", marginLeft:'2px'}}/></Button>

                                    {
                                        result == "Anemia" && (
                                            <Button
                                            className='mt-3 mb-2'
                                            onClick={lookForDoctor}
                                            style={{
                                                backgroundColor: "#DC2228",
                                                border: '1px solid #DC2228',
                                                maxWidth:'250px'
                                            }}>Consult Doctor <FontAwesomeIcon icon={faArrowRight} style={{color: "white",width:"15px", height:"15px", marginLeft:'2px'}}/></Button>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                    :
                    <p>
                        {filename}
                    </p>
                }
        </Container>
    );
};

export default PredictPage;
