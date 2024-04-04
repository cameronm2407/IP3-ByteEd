import { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Textbox from "./components/Textbox";
import CodeEditor from "./components/CodeEditor";
import RelatedVideos from "./components/RelatedVideos";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Watch() {
  const heightPlayer = window.innerHeight * 0.75;
  let { videoId } = useParams();
  const videoCall = "http://localhost:443/api/content/video?id=" + videoId;

  const [video, setVideo] = useState([]);

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

  if (video.length === 0) {
    return (
      <div className="card text-center">
        <h1 className="card-title">Video not Found</h1>
      </div>
    );
  }
  return (
    <Container
      fluid
      className="text-center h-100 w-100 bg-dark pt-3 "
      style={{ position: "relative", overflow: "none" }}
    >
      <Row className="h-25">
        <Col className="col-8">
          <VideoPlayer videoLink={video.url} poster={video.thumbnail} />
        </Col>
        <Col className="col-4 position-relative">
          <Row className="h-50 me-4">
            <Textbox
              videoTitle={video.title}
              videoDescription={video.description}
            />
          </Row>
          <Row
            style={{
              left: "-40px",
              bottom: 0,
              overflowY: "scroll",
            }}
          >
            <RelatedVideos
              courseContent={video.course_content}
              videoId={videoId}
              currentTitle={video.title}
              currentThumbnail={video.thumbnail}
            />
          </Row>
        </Col>
      </Row>
      <Row className="pt-4 w-100">
        <Col fluid className="mx-0 px-0 pb-4">
          <CodeEditor />
        </Col>
      </Row>
    </Container>
  );
}
