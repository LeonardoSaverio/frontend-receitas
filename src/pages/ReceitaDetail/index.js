import React, { useState, FormEvent, useEffect } from 'react';
import { Card, Col, Row, Image, Container, Button } from 'react-bootstrap';
import api from '../../services/api';

import { useNavigate, useParams } from 'react-router-dom'


function ReceitaDetail() {
    const { id } = useParams();

    const [receita, setReceita] = useState({});


    useEffect(() => {
        if (id) {
            api.get(`receitas/${id}`).then(res => setReceita(res.data))
        }
    }, [id])

    console.log(receita)
    return (

        <Container className="d-flex align-items-center justify-content-center mb-3" style={{ minHeight: "90vh" }}>


            <Card className='w-100'>
                <Card.Body>
                    <h2 className='text-center'>
                        {receita.name}
                    </h2>

                    <h6 className='mt-2 d-flex'>Nível  de dificuldade: &nbsp; <p> {receita.difficult}</p> </h6>

                    <h6 className='mt-2 d-flex'>Modo de preparo: &nbsp; <p> {receita.preparation}</p></h6>
                    <hr />
                    <h5 className='mb-2'>Ingredientes</h5 >
                    {/* {receita.ingredientes?.map(ingrediente => (
                        <div className='d-flex'>
                            <h6>Nome: &nbsp;</h6> <p> {ingrediente.name}</p>&nbsp;
                            <h6>Preço: &nbsp;</h6> <p> {ingrediente.price} R$</p>&nbsp;
                            <h6>Quantidade: &nbsp;</h6> <p> {ingrediente.amount}</p>&nbsp;
                        </div>

                    ))} */}
                    <table class="table  table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>

                        {receita.ingredientes?.map(ingrediente => (
                            <tr>
                                <td>{ingrediente.name}</td>
                                <td>{ingrediente.price}</td>
                                <td>{ingrediente.amount}</td>
                            </tr>
                        ))}
    
                        </tbody>
                    </table>

                    <hr className='mt-2' />
                    <h5 className='mt-2 mb-2'>Fotos</h5>
                    <Row>
                        {receita.photos?.map((photo) => (
                            <Col md={3} sm={6} className="pb-3">
                                <Card.Img src={photo} style={{ height: 240, width: '100%' }}></Card.Img>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>

        </Container>
    );
}

export default ReceitaDetail