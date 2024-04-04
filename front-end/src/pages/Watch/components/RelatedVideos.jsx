import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Button, Col } from "react-bootstrap";

function RelatedVideos(props) {
  const { videoId, courseContent, currentTitle, currentThumbnail } = props;
  const arrow = "";
  const link = "/watch/" + videoId;
  //const courseCall = "http://localhost:443/api/content/course?id=" + courseId;
  //const [course, setCourse] = useState({});
  const [courseVideos, setCourseVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:443/api/content/video?$in=${videoId}`
      );
      const courseVideos = (await response.json()).videos;
      setCourseVideos(courseVideos);
    })();
  }, []);
  console.log(courseVideos);
  console.log(`http://localhost:443/api/content/video?$in=${videoId}`);
  console.log("This is " + courseContent);
  return (
    <Container id="related-videos">
      <Row>
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
              <Dropdown.Item>
                <Container className="d-block container-fluid">
                  <Row className="border border-2 border-danger">
                    <a href={link} style={{ textDecoration: "none" }}>
                      <Col className="col-4 border border-2 border-secondary">
                        <img
                          src={currentThumbnail}
                          style={{
                            position: "relative",
                            height: "70px",
                          }}
                        />
                      </Col>
                      <Col
                        className="col-8 border border-2 borderinfo"
                        style={{
                          color: "black",
                          position: "relative",
                          overflow: "hidden",
                          height: "100%",
                          background: "blue",
                        }}
                        id="anchor-related"
                      >
                        <span>{currentTitle}</span>
                      </Col>
                    </a>
                  </Row>
                </Container>
              </Dropdown.Item>
              <Dropdown.Item eventKey={1} className="h-50">
                {videoId}
              </Dropdown.Item>
            </Dropdown.Menu>
          </div>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}

export default RelatedVideos;
