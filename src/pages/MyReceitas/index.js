import React, { useState, FormEvent, useEffect } from 'react';
import { Card, Col, Row, Image, Container, Button } from 'react-bootstrap';
import api from '../../services/api';
import { RiDeleteBin6Line } from 'react-icons/ri'

import { Link, useNavigate } from 'react-router-dom'


function MyReceitas() {
    const history = useNavigate()

    const [receitas, setReceitas] = useState([]);

    useEffect(() => {
        api.get('user/receitas').then(res => setReceitas(res.data))
    }, [])

    function handleNavigateDetail(id) {
        history(`/receita/${id}`)
    }

    async function handleDelete(id) {
        await api.delete(`/receitas/${id}`)
        const newList = receitas.filter((receita) => receita.id !== id)
        setReceitas(newList)
    }

    return (
        <Container fluid style={{ paddingLeft: 35, paddingBottom: 35 }}>
            <div>
                <h4 className="mb-3 text-center">Minhas receitas</h4>

                <Button onClick={() => history('/receita-new')} size='lg' className='mb-4 ' variant="success">Nova receita</Button>
            </div>
            <Row className='w-100'>
                {receitas.map(receita => (

                    <Col key={receita.id} md={3} sm={6} className="pb-3">
                        <Card>
                            <Card.Body style={{ cursor: 'pointer' }} onClick={() => handleNavigateDetail(receita.id)}>

                                <Card.Body>
                                    <Card.Title className="text-center" style={{ contain: 'size' }}>{receita.name}</Card.Title>
                                </Card.Body >
                                <Card.Body>
                                    <Image style={{ height: 240, width: '100%' }} src={receita.photos[0]} fluid />
                                </Card.Body>
                            </Card.Body>
                            <Card.Footer className='d-flex justify-content-center'>
                                <RiDeleteBin6Line
                                    onClick={() => { if (window.confirm('Deseja realmente excluir está receita?')) { handleDelete(receita.id) }; }}
                                    color='red' size={35} cursor="pointer" className='mr-4 ml-4' />
                            </Card.Footer>
                        </Card>
                    </Col>

                ))}



            </Row>

        </Container>
    );
}

export default MyReceitas