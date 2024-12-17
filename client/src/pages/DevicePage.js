import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {fetchOneDevice} from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, [id]);

    return (
        <Container className="mt-4">
            {/* Название товара */}
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">{device.name}</h2>
                </Col>
            </Row>

            {/* Основной блок с изображением и ценой */}
            <Row className="d-flex">
                {/* Левая колонка - изображение товара */}
                <Col md={6} className="d-flex justify-content-center">
                    <Image 
                        src={process.env.REACT_APP_API_URL + device.img}
                        style={{maxWidth: "100%", maxHeight: "350px", objectFit: "contain"}}
                    />
                </Col>

                {/* Правая колонка - цена и кнопка */}
                <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                    <Card
                        className="d-flex flex-column align-items-center p-4"
                        style={{width: "100%", maxWidth: "400px", border: '1px solid #eaeaea'}}
                    >
                        <h3 className="mb-3">Цена: {device.price} руб.</h3>
                        <Button variant="outline-primary" style={{width: "100%"}}>
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>

            {/* Характеристики */}
            <Row className="mt-5">
                <Col>
                    <h4 className="mb-3">Характеристики</h4>
                    <div style={{border: '1px solid #eaeaea', borderRadius: "8px", padding: "10px"}}>
                        {device.info.map((info, index) => (
                            <Row
                                key={info.id}
                                style={{
                                    background: index % 2 === 0 ? '#f9f9f9' : 'transparent',
                                    padding: "8px",
                                }}
                            >
                                <Col sm={4} className="fw-bold">
                                    {info.title}:
                                </Col>
                                <Col sm={8}>
                                    {info.description}
                                </Col>
                            </Row>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePage;
