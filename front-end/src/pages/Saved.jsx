import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import "./profile.css";

export default function Profile() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    location: "",
    bio: "",
    role: "",
  });

  const token_initial = localStorage.getItem("token");

  var myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "shared-env",
      uploadPreset: "ml_default",
      folder: "IP3-ByteEd-resources/profile_pictures",
      clientAllowedFormats: ["images"],
    },
    (error, result) => {
      if (error) {
        console.error("Upload Widget error:", error);
        return;
      }
      if (result && result.event === "success") {
        console.log("File uploaded successfully:", result.info);
        setAvatarUrl(result.info.url);
      }
    }
  );

  const openCloudinaryWidget = () => {
    myWidget.open();
  };

  useEffect(() => {
    if (!token_initial) {
      window.location.href = "/login";
    } else {
      setProfile(jwtDecode(token_initial).user);
    }
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setFormData({
      username: profile.username,
      email: profile.email,
      location: profile.location,
      bio: profile.bio,
      role: profile.role,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    const changedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== profile[key]) {
        changedFields[key] = formData[key];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      console.log("No changes detected.");
    }

    try {
      const response = await fetch("http://localhost:443/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_initial}`,
        },
        body: JSON.stringify(changedFields),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setProfile(data.updatedUser);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }

    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
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
        className="mx-5 mb-5 p-5 shadow profile-card"
        style={{
          marginTop: "-150px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <Card.Body className="text-center">
          <h2 className="fw-bold mb-5">Your Profile</h2>
          <Row className="mb-3 justify-content-center">
            <Col sm={6} className="text-center">
              <div className="avatar-section">
                <img src={profile.avatar} alt="Avatar" className="avatar" />
              </div>
              {editMode && (
                <Button
                  onClick={openCloudinaryWidget}
                  className="text-dark btn-light mt-3"
                  style={{ backgroundColor: "#BDA1CC" }}
                >
                  <FontAwesomeIcon icon={faEdit} className="edit-icon me-2" />
                  Edit Avatar
                </Button>
              )}
            </Col>
          </Row>
          <div className="personal-info-section">
            {editMode ? (
              <Form onSubmit={handleSaveChanges}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label>Location (City)</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="learner">Learner</option>
                    <option value="content creator">Content Creator</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  className="w-100 mb-1 text-dark btn-light"
                  type="submit"
                  style={{ backgroundColor: "#BDA1CC" }}
                >
                  Save Changes
                </Button>
                <Button
                  className="w-100 mb-1 text-dark btn-light"
                  onClick={handleCancel}
                  style={{ backgroundColor: "#BDA1CC" }}
                >
                  Cancel
                </Button>
              </Form>
            ) : (
              <Row>
                <Col sm={6}>
                  <div className="info-item">
                    <h4>Username</h4>
                    <p>{profile.username}</p>
                  </div>
                  <div className="info-item">
                    <h4>Email</h4>
                    <p>{profile.email}</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="info-item">
                    <h4>Location</h4>
                    <p>
                      {profile.location
                        ? profile.location
                        : "No Location provided"}
                    </p>
                  </div>
                  <div className="info-item">
                    <h4>Role</h4>
                    <p>{profile.role}</p>
                  </div>
                </Col>
                <div className="info-item">
                  <h4>Bio</h4>
                  <p>{profile.bio ? profile.bio : "No bio provided"}</p>
                </div>
              </Row>
            )}
            {!editMode && (
              <Row className="justify-content-center">
                <Col sm={6} className="text-center">
                  <Button
                    onClick={handleEdit}
                    className="text-dark btn-light"
                    style={{ backgroundColor: "#BDA1CC" }}
                  >
                    <FontAwesomeIcon icon={faEdit} className="edit-icon me-2" />
                    Update Personal Information
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
