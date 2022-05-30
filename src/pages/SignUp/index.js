import React, { useState, FormEvent } from 'react';
import './styles.css';
import { Button, Col, Form, InputGroup, Row, Container, Card, Anchor } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
  password: yup.string().required('Campo obrigatório').min(6, 'O campo senha deve ter no mínimo 6 caracteres')
});


function SignUp() {
  const navigate = useNavigate();

  const { signup } = useAuth();

  async function register(name, email, password) {
    try {
      const res = await signup(name, email, password);
      navigate("/");
    } catch (err) {
      if (err.response.status === 409) {
        alert('Usuário ja existe.')
      }
    }

  }

  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }} >

      <Card className="w-100" style={{ maxWidth: "400px" }} >
        <Card.Body>
          <h2 className="text-center mb-4">Cadastro</h2>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              register(values.name, values.email, values.password)
            }}
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              resetForm
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="12"
                    className="form-group"
                  >
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="12"
                    className="form-group"
                  >
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="12"
                    className="form-group"
                  >
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button className="w-100" type="submit">Cadastrar</Button>
              </Form>
            )}
          </Formik>
        </Card.Body>

        <div className="w-100 text-center mt-2 mb-4 ">
          Já tem uma conta? <Link className=" font-weight-bold" to="/signin">Acesso</Link>
        </div>
      </Card>

    </Container>
  );
}

export default SignUp