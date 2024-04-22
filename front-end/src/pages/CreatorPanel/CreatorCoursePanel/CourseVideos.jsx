import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function courseVideos({ video }) {
  const link = "/watch/" + video._id;
  let videoTime = "";

  if (video.duration_seconds >= 3600 && video.duration_seconds <= 360000) {
    videoTime = Math.round((video.duration_seconds / 3600) * 2) / 2 + " Hours";
  } else if (video.duration_seconds > 360000) {
    videoTime = "100+ Hours";
  } else {
    videoTime = Math.round(video.duration_seconds / 60) + " Minutes";
  }

  const token = localStorage.getItem("token");
  const deleteCourse = async () => {
    // Confirm deletion with the user
    const answer = window.confirm(
      "Are you sure you would like to delete this video?"
    );

    if (!answer) {
      console.log("Course deletion cancelled.");
      return; // Exit if the user cancels the confirmation
    }

    try {
      console.log("Attempting to delete course with ID:", video._id);

      const response = await fetch(
        `http://localhost:443/api/content/video?id=${video._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server responded for course ID:", video._id);

      if (!response.ok) {
        throw new Error(
          `Network response was not ok for course ID ${video._id}`
        );
      }

      const data = await response.json(); // Get the JSON response body

      console.log("Successfully deleted course with ID:", video._id);
      console.log("Server response:", data); // Optional: Log server's response about the deletion
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  return (
    <Container className="card-container" id="course-card">
      <Row
        className="image-container position-relative display-flex"
        id="courseVideoThumbnail"
      >
        <div className="text-end fs-6 position-absolute">
          <h4>{videoTime}</h4>
        </div>
        <a href={link}>
          <img src={video.thumbnail} alt="" className="video-thumbnail" />
        </a>
      </Row>
      <Row className="card-title">
        <a href={link}>
          <h4 className="ellipsis fs-6">{video.title}</h4>
        </a>
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

export default courseVideos;
