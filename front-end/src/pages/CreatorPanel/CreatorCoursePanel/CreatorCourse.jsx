import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CourseVideos from "../../Course/CourseVideos";

function Course() {
  let { courseId } = useParams();
  const courseCall = "http://localhost:443/api/content/course?id=" + courseId;
  const [course, setCourse] = useState({});
  const [courseVideos, setCourseVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(courseCall);
      const data = await res.json();
      const course = data.courses[0];
      setCourse(course);

      const videoIds = course.videos;
      const response = await fetch(
        `http://localhost:443/api/content/video?$in=${videoIds}`
      );
      const courseVideos = (await response.json()).videos;
      setCourseVideos(courseVideos);
    })();
  }, []);
  console.log(`http://localhost:443/api/content/video?$in=${course.videos}`);
  console.log(courseVideos);
  if (courseVideos.length === 0) {
    return (
      <div className="card position-absolute start-50 translate-middle mt-5 ms-5 bg-danger text-white">
        <h1 className="card-title">Error 404: Course Not Found</h1>
      </div>
    );
  }
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
            <span>{course.description}</span>
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
