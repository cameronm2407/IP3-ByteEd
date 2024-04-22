import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Course from "./CourseCard";

function Courses() {
  let { userId } = useParams();
  const coursesCall =
    "http://localhost:443/api/content/course?creator=" + userId; //get courses
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(coursesCall);
      const courses = (await response.json()).courses;
      setCourses(courses);
    })();
  }, []);

  if (courses.length === 0) {
    return (
      <div className="card position-absolute start-50 translate-middle mt-5 ms-5 bg-danger text-white">
        <h1 className="card-title">Error 404: You have no videos</h1>
      </div>
    );
  }
  return (
    <Container className=" vh-100 vw-100 mt-5">
      <Row className="text-center mb-3 color-white">
        <h1>Creator Panel</h1>
      </Row>
      <Row>
        {courses ? (
          <div style={{ fontSize: "18px" }}>
            <p>Here's your video</p>
          </div>
        ) : (
          <div style={{ fontSize: "18px" }}>
            <p>You have no videos</p>
          </div>
        )}
      </Row>
      <Row>
        {courses.map((course, i) => (
          <Course key={i} course={course} />
        ))}
        {console.log("here it is " + courses)}
      </Row>
    </Container>
  );
}

export default Courses;
