import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import CourseVideos from "./CourseVideos";
import Loading from "../../../Loading";
import getCurrentUser from "../../../utils/currentUser";

function Course() {
  const [user, setUser] = useState(null);
  let id = "";
  useEffect(() => {
    const user = getCurrentUser();
    setUser(user); // Setting the user state
  }, []);
  if (user) {
    console.log(user._id);
    id = user._id;
  }

  let { courseId } = useParams();
  const courseCall = "http://localhost:443/api/content/course?id=" + courseId;
  const [course, setCourse] = useState({});
  const [courseVideos, setCourseVideos] = useState([]);
  const [noCourse, setNoCourse] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const goBack = "/creatorPanel/courses/" + id;
  useEffect(() => {
    (async () => {
      const res = await fetch(courseCall);
      const data = await res.json();
      const course = data.courses[0];
      setCourse(course);
      setNoCourse(false);
      setIsLoading(false);
      console.log(course);
      const videoIds = course.videos;
      if (course.videos.length != 0) {
        const response = await fetch(
          `http://localhost:443/api/content/video?$in=${videoIds}`
        );
        const courseVideos = (await response.json()).videos;
        setCourseVideos(courseVideos);
        console.log(courseVideos);
      }
    })();
  }, []);
  console.log(`http://localhost:443/api/content/video?$in=${course.videos}`);
  console.log(courseVideos);
  if (isLoading) {
    <Loading />;
  } else if (noCourse) {
    return (
      <div className="card position-absolute start-50 translate-middle mt-5 ms-5 bg-danger text-white">
        <h1 className="card-title">Error 404: Course Not Found</h1>
        <Button href={goBack}>Go Back</Button>
      </div>
    );
  } else if (courseVideos.length == 0) {
    return (
      // I need to fix all this positioning for this part
      <Container>
        <Col>
          <Row className="card position-absolute start-50 translate-middle mt-5 ms-5 bg-danger text-white">
            <h1 className="card-title">No Videos in Course</h1>
          </Row>
        </Col>
      </Container>
    );
  } else
    return (
      <Container className=" vh-100 vw-100 mt-5">
        <Row className="text-center mb-3 color-white">
          <h1>{course.name}</h1>
        </Row>
        <Row>
          {course.programming_language ? (
            <div style={{ fontSize: "18px" }}>
              <span style={{ fontWeight: "bold" }}>Language: </span>
              <span>{course.programming_language}</span>
            </div>
          ) : null}
        </Row>
        <Row className="mb-5">
          {course.description ? (
            <div>
              <span>
                <b>Description:</b> {course.description}
              </span>
            </div>
          ) : null}
        </Row>
        <Row>
          <h3 style={{ textAlign: "start" }}>Videos</h3>
        </Row>
        <Row>
          {courseVideos.map((video, i) => (
            <CourseVideos key={i} video={video} />
          ))}
        </Row>
      </Container>
    );
}

export default Course;
