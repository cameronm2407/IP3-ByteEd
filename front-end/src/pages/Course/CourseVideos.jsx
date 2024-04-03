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

  return (
    <Container className="card-container">
      <Row className="image-container">
        <a href={link}>
          <img src={video.thumbnail} alt="" className="video-thumbnail" />
        </a>
      </Row>
      <Row className="card-title">
        <a href={0}>
          <h4 className="ellipsis fs-6">{video.title}</h4>
        </a>
      </Row>
      <Row className="text-end fs-6">
        <h4>{videoTime}</h4>
      </Row>
    </Container>
  );
}

export default courseVideos;
