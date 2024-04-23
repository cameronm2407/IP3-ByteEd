import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Videos from "./CreatorCourseVideoPanel/CourseVideos";
import getCurrentUser from "../../utils/currentUser";

function Video() {
  let { userId } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:443/api/content/video?creator=${userId}&course_content=false`
      );
      const videos = (await response.json()).videos;
      setVideos(videos);
      console.log(videos);
    })();
  }, []);
  if (videos.length === 0) {
    return (
      <div className="card position-absolute start-50 translate-middle mt-5 ms-5 bg-danger text-white">
        <h1 className="card-title">Error 404: Course Not Found</h1>
      </div>
    );
  }
  return (
    <Container className=" vh-100 vw-100 mt-4">
      <Row className="text-center mb-3 color-white">
        <h1>Your Videos</h1>
      </Row>

      <Row>
        {videos.map((video, i) => (
          <Videos key={i} video={video} />
        ))}
      </Row>
    </Container>
  );
}

export default Video;
