import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

function Textbox(props) {
  const { videoTitle, videoDescription, courseContent } = props;
  const videoID = "";

  return (
    <Container className="text-start">
      <Row>
        <h2 style={{ color: "#BDA1CC", padding: 0 }}>{videoTitle}</h2>
      </Row>
      <Row>
        <p style={{ color: "#FFFFFF", padding: 0 }}>{videoDescription}</p>
      </Row>
      <Row className="w-25 p-3">
        {courseContent ? (
          ""
        ) : (
          <Dropdown.Menu show>
            <Dropdown.Header>Other Videos</Dropdown.Header>
            <Dropdown.Item eventKey={videoID}>Another action</Dropdown.Item>
          </Dropdown.Menu>
        )}
      </Row>
    </Container>
  );
}

export default Textbox;
