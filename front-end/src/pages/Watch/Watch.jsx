import { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Textbox from "./components/Textbox";
import CodeEditor from "./components/CodeEditor";
import RelatedVideos from "./components/RelatedVideos";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";
import NotFoundPage from "../NotFoundPage";

export default function Watch() {
  const heightPlayer = window.innerHeight * 0.75;
  let { videoId } = useParams();
  const videoCall = "http://localhost:443/api/content/video?id=" + videoId;
  const [video, setVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(videoCall, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setVideo(data.videos[0]);
        console.log(data.videos);
      })
      .then(setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);
  console.log(video.lent);
  if (isLoading) {
    return <Loading />;
  } else if (video.length == 0) {
    return <NotFoundPage />;
  } else {
    return (
      <Container
        fluid
        className="text-center h-100 w-100 bg-dark pt-3 "
        style={{ position: "relative", overflow: "none" }}
      >
        {console.log(video.length)}
        {console.log(isLoading)}
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
                display: "block",
              }}
            >
              <div>
                <RelatedVideos
                  courseContent={video.course_content}
                  videoId={videoId}
                  currentTitle={video.title}
                  currentThumbnail={video.thumbnail}
                  routeChange={video._id}
                />
              </div>
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
}
