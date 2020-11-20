import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classes from './style.module.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPossword] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        console.log(email, password);
        axios.post('http://localhost:3000/login', { email, password })
            .then((res) => console.log('login', res))
            .catch((err) => console.log('login err', err))
    }
    return (
        <Container>
            <Row>
                <Col md={{ span: 6 }} className='d-flex align-items-center'>
                    <img src="images/1.jpg" className='w-100' alt='login' />
                </Col>
                <Col md={{ span: 6 }} className={classes.rightSection}>
                    <h1 className='mb-5'>Մուտք գործել հաշիվ</h1>
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                className={classes.input}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPossword(e.target.value)}
                                className={classes.input}
                            />
                        </Form.Group>
                        <button className={`${classes.submit} mt-3 `} type="submit">
                            Submit
                        </button>
                    </Form>
                    <Link to='/register'>Գրանցեք ձեր խանութը</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;