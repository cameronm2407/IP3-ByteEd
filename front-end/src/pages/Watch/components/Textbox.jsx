import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Textbox(props) {
  const { videoTitle, videoDescription } = props;
  return (
    <Container className="text-start">
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