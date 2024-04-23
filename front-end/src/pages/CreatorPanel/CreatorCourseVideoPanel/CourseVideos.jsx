import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function CourseVideos({ video }) {
  const link = `/watch/${video._id}`;
  const [views, setViews] = useState(null);

  let videoTime = "";
  if (video.duration_seconds >= 3600 && video.duration_seconds <= 360000) {
    videoTime = `${Math.round((video.duration_seconds / 3600) * 2) / 2} Hours`;
  } else if (video.duration_seconds > 360000) {
    videoTime = "100+ Hours";
  } else {
    videoTime = `${Math.round(video.duration_seconds / 60)} Minutes`;
  }

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(
          `http://localhost:443/api/videos/views?id=${video._id}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setViews(data.views);
        }
      } catch (error) {
        console.error("Failed to fetch views:", error);
      }
    };

    fetchViews();
  }, [video._id]);

  const token = localStorage.getItem("token");
  const deleteCourse = async () => {
    const answer = window.confirm(
      "Are you sure you would like to delete this video?"
    );
    if (!answer) return;

    try {
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

      if (!response.ok) {
        throw new Error(
          `Network response was not ok for course ID ${video._id}`
        );
      }

      const data = await response.json();
      console.log("Successfully deleted course with ID:", video._id, data);
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
        <Col xs={9} className="d-flex align-items-center">
          <p>Views: {video.views}</p>
        </Col>
        <Col xs={3} className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={deleteCourse}>
            Delete
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default CourseVideos;
