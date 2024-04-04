import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CourseVideos from "./CourseVideos";

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
        {courseVideos.map((video, i) => (
          <CourseVideos key={i} video={video} />
        ))}
      </Row>
    </Container>
  );
}

export default Course;
