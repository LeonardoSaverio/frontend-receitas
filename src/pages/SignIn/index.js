import React, { useState, FormEvent } from 'react';
import { Button, Col, Form, InputGroup, Row, Container, Card } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
  password: yup.string().required('Campo obrigatório')
});


function SignIn() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(email, password) {
    try {
      await signin(email, password);
      navigate("/home")
    } catch (err) {
      if (err.response.status === 401) {
        alert('E-mail ou senha incorretos')
      } else {
        alert('Occoreu um problema, tente novamente')
      }
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }} >

      <Card className="w-100" style={{ maxWidth: "400px" }} >
        <Card.Body>
          <h2 className="text-center mb-4">Acesso</h2>
          <Formik
            validationSchema={schema}
            onSubmit={(values, e) => {
              handleLogin(values.email, values.password)
            }}
            initialValues={{
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
                <Button className="w-100" type="submit">Acessar</Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-4 ">
          Não tem uma conta? <Link className=" font-weight-bold" to="/signup" >Cadastre-se</Link>
        </div>
      </Card>

    </Container>
  );
}

export default SignIn