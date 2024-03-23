import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  const openCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "shared-env",
        uploadPreset: "ml_default",
        folder: "IP3-ByteEd-resources/profile_pictures",
      },
      (error, result) => {
        if (error) {
          console.error("Upload Widget error:", error);
          return;
        }
        if (result && result.event === "success") {
          console.log("File uploaded successfully:", result.info);
          setAvatarUrl(result.info.url); // Save the uploaded avatar URL
        }
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);

    if (!avatarUrl) {
      alert("Please select an avatar before submitting.");
      return;
    }

    const user = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      location: formData.get("location"),
      bio: formData.get("bio"),
      avatar: avatarUrl,
      age: formData.get("age"),
      gender: formData.get("gender"),
    };

    try {
      const response = await fetch("http://localhost:443/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token)
      navigate("/");
      window.location.reload(); 
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
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
          <h2 className="fw-bold mb-5">Sign up now</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4" controlId="formUsername">
                  <Form.Label>Username *</Form.Label>
                  <Form.Control type="text" required name="username" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type="email" required name="email" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control type="password" required name="password" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4" controlId="formRole">
                  <Form.Label>Role *</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    defaultValue=""
                    name="role"
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="learner">learner</option>
                    <option value="content_creator">Content Creator</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={12}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button onClick={openCloudinaryWidget} className="text-dark btn-light" style={{ width: "200px", backgroundColor: "#BDA1CC" }}>
                    Choose Avatar
                  </Button>
                  <Form.Control
                    type="text"
                    readOnly
                    value={avatarUrl}
                    placeholder="Avatar URL will appear here..."
                    style={{ flexGrow: 1 }}
                  />
                </div>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="formLocation">
              <Form.Label>Location (City)</Form.Label>
              <Form.Control type="text" name="location" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} name="bio" />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4" controlId="formAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="number" min="0" name="age" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4" controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" defaultValue="" name="gender">
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button className='w-100 mb-1 text-dark btn-light' type="submit" style={{backgroundColor: "#BDA1CC"}}>
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
