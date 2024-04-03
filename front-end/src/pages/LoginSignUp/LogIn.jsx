import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);

    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:443/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Wrong credentials, please try again.");
      }

      const data = await response.json();
      console.log(data);
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload(); // yemp
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container className="custom-container">
      <div
        className="bg-image"
        style={{
          backgroundImage:
            "url(https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202206/MIT_3Q-Computing-Power-01_0.jpg?itok=uQmUuyqI)",
          height: "200px",
          width: "100vw",
          margin: "0",
          padding: "0",
        }}
      ></div>

      <Card
        className="mx-5 mb-5 p-5 shadow"
        style={{
          marginTop: "-150px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <Card.Body className="text-center">
          <h2 className="fw-bold mb-5">Login now</h2>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
          {/* Add this line */}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type="email" required name="email" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control type="password" required name="password" />
                </Form.Group>
              </Col>
            </Row>
            <Button
              className="w-100 mb-1 text-dark btn-light"
              type="submit"
              style={{ backgroundColor: "#BDA1CC" }}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
