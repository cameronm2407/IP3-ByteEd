import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Button, Col } from "react-bootstrap";
import CourseVideos from "./CourseVideos";
import { useNavigate } from "react-router-dom";

function RelatedVideos(props) {
  const { videoId, courseContent, currentTitle, currentThumbnail } = props;
  const arrow = "";
  const link = "/watch/" + videoId;
  const courseCall =
    "http://localhost:443/api/content/course?videos=" + videoId;
  const [course, setCourse] = useState([]);
  const [videos, setVideos] = useState([]);
  const [courseVideos, setCourseVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(courseCall);
      const course = (await response.json()).courses[0];

      setCourse(course);

      const videoIds = course.videos;
      const res = await fetch(
        `http://localhost:443/api/content/video?$in=${videoIds}`
      );
      const courseVideos = (await res.json()).videos;
      setVideos(courseVideos);
    })();
  }, []);

  const routeChange = () => {
    const courseUrl = "/course/" + course._id;
    navigate(courseUrl);
    window.location.reload();
  };

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
                  textAlign: "center",
                }}
              >
                Other Videos In Course
              </Dropdown.Header>
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
            </Dropdown.Menu>
            <Row>
              <Button
                id="course-button"
                className="p-2 mx-4"
                style={{
                  bottom: 0,
                  position: "relative",
                  right: 0,
                  width: "auto",
                  right: -12,
                  zIndex: 9999,
                }}
                onClick={routeChange}
              >
                Back to Course Page
              </Button>
            </Row>
          </div>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}

export default RelatedVideos;
