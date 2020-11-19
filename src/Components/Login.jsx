import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPossword] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/doctor/12')
        .then((res) => console.log('get', res.data))
        .catch((err) => console.log('get err', err))
    }, [])

    const handleSave = (e) => {
        e.preventDefault();
        console.log(email, password);
        axios.post('http://localhost:3000/login', {email, password})
        .then((res) => console.log('login', res))
        .catch((err) => console.log('login err', err))
    }
    return(
        <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={handleSave}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                     />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPossword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
}

export default Login;