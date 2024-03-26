import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import "./profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setProfile(jwtDecode(token));
  }, []);

  console.log(profile);

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
          {/* First Section: Avatar, Username, Role, Location */}
          <div className="profile-section">
            <div className="avatar-section">
              <img
                src={profile?.user?.avatar}
                alt="Avatar"
                className="avatar"
              />
            </div>
            <div className="info-section">
              <p className="username">{profile?.user?.username}</p>
              <p className="role">{profile?.user?.role}</p>
              <p className="location">{profile?.user?.location}</p>
            </div>
            <Button
              className="mb-1 text-dark btn-light"
              style={{ backgroundColor: "#BDA1CC" }}
            >
              <FontAwesomeIcon icon={faEdit} className="edit-icon" />
              Edit Avatar
            </Button>
          </div>
          <div className="personal-info-section">
            <h3>Personal Information</h3>
            <div className="info-row">
              <div className="info-item">
                <h4>Username</h4>
                <p>{profile?.user?.username}</p>
              </div>
              <div className="info-item">
                <h4>Email</h4>
                <p>{profile?.user?.email}</p>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <h4>Location</h4>
                <p>{profile?.user?.location}</p>
              </div>
              <div className="info-item">
                <h4>Role</h4>
                <p>{profile?.user?.role}</p>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <h4>Bio</h4>
                <p>{profile?.user?.bio}</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
