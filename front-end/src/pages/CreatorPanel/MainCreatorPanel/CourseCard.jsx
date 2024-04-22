import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function courseVideos({ course }) {
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
    </Container>
  );
}

export default courseVideos;
