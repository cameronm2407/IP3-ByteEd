import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Button } from "react-bootstrap";
function RelatedVideos(props) {
  const { videoTitle, videoDescription, courseContent } = props;
  const videoID = "";
  const arrow = "";
  console.log("This is " + courseContent);
  return (
    <Container id="related-videos">
      <Row className="">
        {courseContent ? (
          <div className="">
            <Dropdown.Menu
              show
              className="position-relative w-100 border border-3"
            >
              <Dropdown.Header
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textAlign: "start",
                }}
              >
                Other Videos In Course
              </Dropdown.Header>
              <Dropdown.Item eventKey={videoID}>{videoTitle}</Dropdown.Item>
            </Dropdown.Menu>
            <Button id="course-button" className="p-2">
              Back to Course Page
            </Button>
          </div>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}

export default RelatedVideos;
