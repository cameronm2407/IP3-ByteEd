import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row } from "react-bootstrap";
function RelatedVideos(props) {
  const { videoTitle, videoDescription, courseContent } = props;
  const videoID = "";
  return (
    <Container className="">
      <Row className="">
        {courseContent ? (
          <Dropdown.Menu show className="position-relative w-100">
            <Dropdown.Header>Other Videos</Dropdown.Header>
            <Dropdown.Item eventKey={videoID}>Another action</Dropdown.Item>
          </Dropdown.Menu>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}

export default RelatedVideos;
