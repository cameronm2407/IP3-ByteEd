import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CourseVideos from "./CourseVideos";

function Course() {
  let { courseId } = useParams();
  const courseCall = "http://localhost:443/api/content/course?id=" + courseId;
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch(courseCall, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const course = data.courses[0];
        setCourse(course);
      })
      .catch((error) => console.log(error));
  }, []);

  const video = course.videos;

  if (course.length === 0) {
    return (
      <div className="card text-center">
        <h1 className="card-title">Video not Found</h1>
      </div>
    );
  }
  return (
    <Container className="m-4">
      <Row className="text-center mb-3">
        <h1>{course.name}</h1>
      </Row>
      <Row className="mb-4">
        <p>{course.description}</p>
      </Row>
      <Row>
        <h3>Videos</h3>
      </Row>
      <Row>
        {video.map((video) => (
          <CourseVideos videoId={video} />
        ))}
      </Row>
    </Container>
  );
}

export default Course;
