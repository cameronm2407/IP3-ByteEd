import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function courseVideos({ video }) {
  const link = "/watch/" + video._id;
  let videoTime = "";

<<<<<<< HEAD
  const textStyle = {
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  useEffect(() => {
    fetch(videoCall, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setVideo(data.videos[0]);
        console.log(data.videos);
      })
      .catch((error) => console.log(error));
  }, []);

=======
>>>>>>> ed81bdd8e5e698c5a11bb9ada76675ddc51fbd0d
  if (video.duration_seconds >= 3600 && video.duration_seconds <= 360000) {
    videoTime = Math.round((video.duration_seconds / 3600) * 2) / 2 + " Hours";
  } else if (video.duration_seconds > 360000) {
    videoTime = "100+ Hours";
  } else {
    videoTime = Math.round(video.duration_seconds / 60) + " Minutes";
  }

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
        <a href={0}>
          <h4 className="ellipsis fs-6">{video.title}</h4>
        </a>
      </Row>
    </Container>
  );
}

export default courseVideos;
