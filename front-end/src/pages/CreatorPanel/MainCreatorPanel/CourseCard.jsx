import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function CourseVideos({ course }) {
  const token = localStorage.getItem("token");
  const deleteCourse = async () => {
    // Confirm deletion with the user
    const answer = window.confirm(
      "Are you sure you would like to delete this course?"
    );

    if (!answer) {
      console.log("Course deletion cancelled.");
      return; // Exit if the user cancels the confirmation
    }

    try {
      console.log("Attempting to delete course with ID:", course._id);

      const response = await fetch(
        `http://localhost:443/api/content/course?id=${course._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiX2Rlc3R1dSIsImVtYWlsIjoidWR1ZWJob2xvZEBnbWFpbC5jb20iLCJwYXNzd29yZCI6bnVsbCwicm9sZSI6ImNvbnRlbnRfY3JlYXRvciIsImxvY2F0aW9uIjoiR2xhc2dvdyIsImF2YXRhciI6Imh0dHBzOi8vaS5waW5pbWcuY29tLzczNngvOTMvNjQvYzMvOTM2NGMzYjk1YmE0ZjYyMDg3MWYxMTY5NTllOWRhNjIuanBnIiwiYmlvIjoiVGhpcyBpcyBteSBkZXZlbG9wbWVudCBjb250ZW50IGNyZWF0b3IgYWNjb3VudCIsIl9pZCI6IjY2MDIyMjJjNDAxN2QyYzIzMDkwYWM1MiIsInJlZ2lzdHJhdGlvbl9kYXRlIjoiMjAyNC0wMy0yNlQwMToxNzozMi40OThaIiwiX192IjowfSwiaWF0IjoxNzExNDE1ODUyLCJleHAiOjE3MjcxNDA2NTJ9.ivuJqxBKleZ1tOXjyMq9YJd5G96RZlQB3hNesxP0ryY`,
          },
        }
      );

      console.log("Server responded for course ID:", course._id);

      if (!response.ok) {
        throw new Error(
          `Network response was not ok for course ID ${course._id}`
        );
      }

      const data = await response.json(); // Get the JSON response body

      console.log("Successfully deleted course with ID:", course._id);
      console.log("Server response:", data); // Optional: Log server's response about the deletion
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  // Build the link to the course view
  const link = `/creatorPanel/course/${course._id}`;

  return (
    <Container className="card-container" id="course-card">
      <Row
        className="image-container position-relative display-flex"
        id="courseVideoThumbnail"
      >
        <Col className="text-end fs-6 position-absolute">
          <h4>View Course</h4>
        </Col>
        <Col>
          <a href={link}>
            <img
              src={course.thumbnail}
              alt="Course Thumbnail"
              className="video-thumbnail"
            />
          </a>
        </Col>
      </Row>
      <Row className="card-title">
        <Col>
          <a href={link}>
            <h4 className="ellipsis fs-6">{course.name}</h4>
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <button className="btn btn-primary" onClick={deleteCourse}>
            Delete
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default CourseVideos;
