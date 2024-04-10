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
          <div className="">
            <Card show className="position-relative w-100 border border-3">
              <Card.Title
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                Other Videos In Course
              </Card.Title>
              <Dropdown.Item style={{ background: "#d3b2e5" }}>
                <Container className="d-block container-fluid">
                  <Row>
                    <a href={routeChange} style={{ textDecoration: "none" }}>
                      <span className="col-4 ">
                        <img
                          src={currentThumbnail}
                          style={{
                            position: "relative",
                            height: "70px",
                            zIndex: 9999,
                          }}
                        />
                      </span>
                      <span
                        className="col-8"
                        style={{
                          color: "black",
                          position: "relative",
                          overflow: "hidden",
                          fontSize: "15px",
                          marginLeft: "10px",
                        }}
                        id="anchor-related"
                      >
                        {currentTitle.length > 40 ? (
                          <span id="long-characters">{currentTitle}</span>
                        ) : (
                          <span style={{ transform: "none" }}>
                            {currentTitle}
                          </span>
                        )}
                      </span>
                    </a>
                  </Row>
                </Container>
              </Dropdown.Item>
              {videos.map((video, i) =>
                videos[i]._id !== videoId ? (
                  <Dropdown.Item eventKey={i} className="h-50">
                    <CourseVideos video={videos[i]} />{" "}
                    {console.log(videos[i]._id)}
                  </Dropdown.Item>
                ) : null
              )}
            </Card>
            <div style={{ textAlign: "end" }}>
              <Button
                id="course-button"
                className="p-2 mx-4"
                style={{
                  position: "relative",
                  right: "0",
                  textAlign: "end",
                  width: "auto",
                  right: -12,
                  zIndex: 9999,
                }}
                onClick={routeChange}
              >
                Back to Course Page
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}

export default RelatedVideos;
