import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const handleSubmit = async (event, navigate) => {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);

  const user = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('http://localhost:443/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data); 
    const token = data.token;
    localStorage.setItem("token", token)
    navigate('/');
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};


export default function Login() {
  const navigate = useNavigate();
  return (
    <Container className="custom-container">
      <div
        className="bg-image"
        style={{
          backgroundImage: 'url(https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202206/MIT_3Q-Computing-Power-01_0.jpg?itok=uQmUuyqI)',
          height: '200px',
          width: '100vw',
          margin: '0',
          padding: '0',
        }}
      ></div>

      <Card
        className='mx-5 mb-5 p-5 shadow'
        style={{
          marginTop: '-150px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(30px)',
        }}
      >
        <Card.Body className='text-center'>
          <h2 className="fw-bold mb-5">Login now</h2>
          <Form onSubmit={(event) => handleSubmit(event, navigate)}> 
            <Row>
              <Col>
                <Form.Group className='mb-4' controlId='formEmail'>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type='email' required name='email'/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-4' controlId='formPassword'>
                  <Form.Label>Password *</Form.Label>
                  <Form.Control type='password' required name='password'/>
                </Form.Group>
              </Col>
            </Row>
            <Button className='w-100 mb-1 text-dark btn-light' type="submit" style={{backgroundColor: "#BDA1CC"}}>Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
