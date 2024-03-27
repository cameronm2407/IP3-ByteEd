import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

function Textbox(props) {
  const { videoTitle, videoDescription, courseContent } = props;
  const videoID = "";

  return (
    <Container className="text-start mh-100 position-relative">
      <Row>
        <h2 style={{ color: "#BDA1CC", padding: 0 }}>{videoTitle}</h2>
      </Row>
      <Row>
        <p style={{ color: "#FFFFFF", padding: 0 }}>{videoDescription}</p>
      </Row>
    </Container>
  );
}

export default Textbox;
