import React, { useEffect, useState, FormEvent } from 'react'
import { Card, Col, Row, Image, Container } from 'react-bootstrap';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const [receitas, setReceitas] = useState([]);
    const history = useNavigate()

    useEffect(() => {
        api.get('receitas').then(res => setReceitas(res.data))
    }, [])

    function handleNavigateDetail(id) {
        history(`/receita/${id}`)
    }

    return (
        <Container fluid style={{ paddingLeft: 35, paddingBottom: 35 }}>

            <h4 className="mb-3 text-center">Encontre as receitas que deseja</h4>

            <Row className='w-100'>
                {
                    receitas?.map(receita => (

                        <Col key={receita.id} md={3} sm={6} className="pb-3">
                            <Card style={{ cursor: 'pointer' }} onClick={() => handleNavigateDetail(receita.id)}>
                                <Card.Body  >
                                    <Card.Title className="text-center" style={{ contain: 'size' }}>{receita.name}</Card.Title>
                                </Card.Body>
                                <Card.Body>
                                    <Image style={{ height: 240, width: '100%' }} src={receita.photos[0]} fluid />
                                </Card.Body>
                            </Card>
                        </Col>

                    ))
                }



            </Row>

        </Container>
    );
}

export default Home