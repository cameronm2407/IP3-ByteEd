import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function courseVideos({ course }) {
  const deleteCourse = async () => {
    const answer = window.confirm(
      "Are you sure you would like to delete this course?"
    );
    if (answer) {
      try {
        console.log(course._id);
        const response = await fetch(
          `http://localhost:443/api/content/course?id=${course._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("Course deleted successfully");
        } else {
          console.error("Failed to delete course");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const link = "/creatorPanel/course/" + course._id;
  return (
    <Container className="card-container" id="course-card">
      <Row
        className="image-container position-relative display-flex"
        id="courseVideoThumbnail"
      >
        <div className="text-end fs-6 position-absolute">
          <h4>View Course</h4>
        </div>
        <a href={link}>
          <img src={course.thumbnail} alt="" className="video-thumbnail" />
        </a>
      </Row>
      <Row className="card-title">
        <a href={link}>
          <h4 className="ellipsis fs-6">{course.name}</h4>
        </a>
      </Row>
      <Row>
        <a className="btn btn-primary" onClick={deleteCourse}>
          Delete
        </a>
      </Row>
    </Container>
  );
}

export default courseVideos;
