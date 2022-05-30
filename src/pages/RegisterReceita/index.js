import React, { useState, FormEvent, useEffect } from 'react';
import './styles.css';
import { Button, Col, Form, InputGroup, Row, Container, Card, Image } from 'react-bootstrap'
import { Formik, FieldArray, FieldArrayConfig, FieldAttributes, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import { AiOutlineUpload } from 'react-icons/ai'
import api from '../../services/api'
import { Link, useNavigate }  from 'react-router-dom'


function RegisterReceita() {

    const history = useNavigate()
 
    const [photos, setPhotos] = useState([]);
    const [indexes, setIndexes] = useState([0]);
    const [counter, setCounter] = useState(1);


    const schema = yup.object().shape({
        name: yup.string().required('Campo obrigatório'),
        difficult: yup.number().required('Campo obrigatório').positive('Não é permitido valores negativos').min(1, 'Preencha com valores entre 1 e 5').max(5, 'Preencha com valores entre 1 e 5'),
        preparation: yup.string().required('Campo obrigatório'),
        photos: yup.array().optional(),
        ingredientes: yup.array().of(
            yup.object().shape({
                name: yup.string().required('Campo obrigatório'),
                price: yup.number().required('Campo obrigatório').positive('Não é permitido valores negativos'),
                amount: yup.number().required('Campo obrigatório').positive('Não é permitido valores negativos')
            })
        )
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            difficult: '',
            preparation: '',
            photos: [],
            ingredientes: [{
                name: '',
                price: '',
                amount: '',
            }]
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('name', values.name)
            formData.append('difficult', values.difficult)
            formData.append('preparation', values.preparation)
            photos.map(photo => formData.append('photos', photo.data))
            formData.append('ingredientes', JSON.stringify(values.ingredientes))
            console.log('formdata', JSON.stringify(formData.get('photos')))
            await api.post('receitas', formData);
            history('/my-receitas')
        },
        validateOnChange: true,
        validationSchema: schema,
    });

    const addReceita = () => {
        setIndexes((prevIndexes) => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeReceita = (index) => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    const clearReceitas = () => {
        setIndexes([]);
    };

    const handleImageUpload = (e) => {
        const tempArr = [];

        [...e.target.files].forEach(file => {
            console.log("file >>> ", file);

            tempArr.push({
                data: file,
                url: URL.createObjectURL(file)
            });

        });
        setPhotos(photos.concat(tempArr));

        return photos;
    };

    return (
        <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "90vh" }} >

            <Card className="w-100" >
                <Card.Body>
                    <h2 className="text-center mb-4">Receita</h2>
                    <FormikProvider value={formik}>
                        <Form noValidate onSubmit={formik.handleSubmit} encType="multipart/form-data">
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    className="form-group"
                                >
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        isValid={formik.touched.name && !formik.errors.name}
                                        isInvalid={formik.touched.name && !!formik.errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    className="form-group"
                                >
                                    <Form.Label>Dificuldade</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="difficult"
                                        value={formik.values.difficult}
                                        onChange={formik.handleChange}
                                        isValid={formik.touched.difficult && !formik.errors.difficult}
                                        isInvalid={formik.touched.difficult && !!formik.errors.difficult}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.difficult}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    Up md="12"
                                    className="form-group"
                                >
                                    <Form.Label>Preparação</Form.Label>
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        name="preparation"
                                        value={formik.values.preparation}
                                        onChange={formik.handleChange}
                                        isValid={formik.touched.preparation && !formik.errors.preparation}
                                        isInvalid={formik.touched.preparation && !!formik.errors.preparation}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.preparation}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="12"

                                    className="form-group"
                                >
                                    <Form.Label>Fotos</Form.Label>
                                    <Form.Label className='photo-input' htmlFor='contained-button-file'>
                                        <AiOutlineUpload fontSize={40} />
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="contained-button-file"
                                        multiple
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        name="photos"
                                        style={{ display: 'none' }}
                                        value={formik.values.photos}
                                        isValid={formik.touched.photos && !formik.errors.photos}
                                        isInvalid={formik.touched.photos && !!formik.errors.photos}
                                    />
                                    <Container className='photos-container' style={{ flexDirection: 'row' }}>
                                        {photos.map((pic, i) => (
                                            <Image className='photo' key={i} fluid src={pic.url} />
                                        ))}
                                    </Container>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.photos}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    className="form-group mt-4"
                                >
                                    <h5 className='mb-2'>Ingredientes</h5>
                                    <hr></hr>
                                    <FieldArray
                                        name='ingredientes'
                                        render={arrayHelpers => (
                                            <div>
                                                {formik.values.ingredientes.map((_, index) => {
                                                    return (
                                                        <Row key={index}>
                                                            <Form.Group
                                                                as={Col}
                                                                md="3"
                                                                className="form-group"
                                                            >
                                                                <Form.Label>Nome</Form.Label>

                                                                <Form.Control
                                                                    type="text"
                                                                    name={`ingredientes[${index}].name`}
                                                                    value={formik.values.ingredientes[index].name}
                                                                    onChange={formik.handleChange}
                                                                    // isValid={formik?.touched?.ingredientes[index]?.name && !formik?.errors?.ingredientes[index]?.name}
                                                                    // isInvalid={formik?.touched?.ingredientes[index]?.name && !!formik?.errors?.ingredientes[index]?.name}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group
                                                                as={Col}
                                                                md="3"
                                                                className="form-group"
                                                            >
                                                                <Form.Label>Quantidade</Form.Label>

                                                                <Form.Control
                                                                    type="number"
                                                                    name={`ingredientes[${index}].amount`}
                                                                    value={formik.values.ingredientes[index].amount}
                                                                    onChange={formik.handleChange}
                                                                // isValid={touched.preparation && !errors.preparation}
                                                                // isInvalid={touched.preparation && !!errors.preparation}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group
                                                                as={Col}
                                                                md="3"
                                                                className="form-group"
                                                            >
                                                                <Form.Label>Preço</Form.Label>

                                                                <Form.Control
                                                                    type="number"
                                                                    name={`ingredientes[${index}].price`}
                                                                    value={formik.values.ingredientes[index].price}
                                                                    onChange={formik.handleChange}
                                                                // isValid={touched.preparation && !errors.preparation}
                                                                // isInvalid={touched.preparation && !!errors.preparation}
                                                                />

                                                                <Form.Control.Feedback type="invalid">
                                                                    {formik.errors.ingredientes?.length}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                            <Form.Group
                                                                className="form-group mt-4"
                                                                as={Col}
                                                                md="3">
                                                                {index === 0 && <Button onClick={() => arrayHelpers.push({})} variant="success">+</Button>}
                                                                {index !== 0 && <Button onClick={() => arrayHelpers.remove(index)} variant="danger">-</Button>}

                                                            </Form.Group>
                                                        </Row>
                                                    )
                                                })}

                                            </div>
                                        )}
                                    />


                                </Form.Group>
                            </Row>
                            <Button variant="success" className="w-100" type="submit">Cadastrar</Button>
                        </Form>
                    </FormikProvider>
                </Card.Body>
            </Card>

        </Container>
    );
}

export default RegisterReceita