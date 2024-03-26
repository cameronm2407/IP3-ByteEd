import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function Saved() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setProfile(jwtDecode(token));
  }, []);

  console.log(profile);
  console.log(profile?.user?.username);

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
          <h2 className="fw-bold mb-5">User Profile</h2>
          <div>
            <p>
              <strong>Username:</strong>
            </p>
            <p>
              <strong>Email:</strong>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
