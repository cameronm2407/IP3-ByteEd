import { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Textbox from "./components/Textbox";
import CodeEditor from "./components/CodeEditor";
import RelatedVideos from "./components/RelatedVideos";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Loading";
import NotFoundPage from "../NotFoundPage";

export default function Watch() {
  const token = localStorage.getItem("token");
  let { videoId } = useParams();
  const videoCall = "http://localhost:443/api/content/video?id=" + videoId;
  const courseCall =
    "http://localhost:443/api/content/course?videos=" + videoId;
  const [course, setCourse] = useState("");
  const [video, setVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseVideos, setCourseVideos] = useState([]);
  const [courseContent, setCourseContent] = useState(false);
  const [goToCourse, setGoToCourse] = useState("");

  useEffect(() => {
    if (videoId) {
      incrementCounter();
    }
  }, [videoId]);

  useEffect(() => {
    fetch(videoCall, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const videoData = data.videos[0];
        const videoWithCounter = {
          ...videoData,
          counter: videoData.counter || 1,
        };
        setVideo(videoWithCounter);
        console.log(data.videos);
        setCourseContent(data.videos[0].course_content);

        fetch(
          `http://localhost:443/api/content/video/updateViews?id=${videoId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Updated Views Count:", data.views);
          })
          .catch((error) => console.error("Error updating views:", error));
      })
      .then(setIsLoading(false))
      .catch((error) => console.log(error));
  }, [videoId]);

  const incrementCounter = async () => {
    try {
      console.log("here is the " + token);
      const response = await fetch(videoCall, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...video,
          counter: video.counter + 1,
        }),
      });

      if (!response.ok) {
        console.error("Failed to increment counter");
      }
    } catch (error) {
      console.error("Error while incrementing counter:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      incrementCounter();
    }
  }, [videoId]);

  useEffect(() => {
    (async () => {
      const res = await fetch(courseCall);
      const data = await res.json();
      const course = data.courses[0];
      setCourse(course);
      setGoToCourse("/course/" + course._id);

      const videoIds = course.videos;
      const response = await fetch(
        `http://localhost:443/api/content/video?$in=${videoIds}`
      );
      const courseVideos = (await response.json()).videos;
      setCourseVideos(courseVideos);
    })();
  }, []);

  let navigate = useNavigate();
  const clickHandler = () => {
    navigate(goToCourse);
  };

  if (isLoading) {
    return <Loading />;
  } else if (!video.title) {
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
        <Row
          className="h-25 me-2"
          style={{ maxHeight: "100%", position: "relative" }}
        >
          <Col className="col-8">
            <VideoPlayer videoLink={video.url} poster={video.thumbnail} />
          </Col>
          <Col
            className="col-4 position-relative "
            style={{
              maxHeight: "100%",
              overflow: "hidden",
            }}
          >
            <Row className="h-50 me-4">
              <Textbox
                videoTitle={video.title}
                videoDescription={video.description}
              />
            </Row>
            {courseContent ? (
              <Row
                style={{ position: "absolute", zIndex: 9999, width: "100%" }}
              >
                {" "}
                <Button
                  id="course-button"
                  className="p-2 me-4"
                  style={{
                    position: "absolute",
                    left: "0",
                    textAlign: "center",
                    width: "auto",
                    pointerEvents: "auto",
                  }}
                  onClick={clickHandler}
                >
                  Back to Course Page
                </Button>
              </Row>
            ) : null}
            <Row
              style={{
                left: "-40px",
                display: "block",
                maxHeight: "70%",
              }}
            >
              <div>
                {courseContent ? (
                  <div>
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        border: "solid",

                        position: "absolute",
                        bottom: 0,
                      }}
                    >
                      <div className="card-header">Other Videos</div>
                      <ul
                        className="list-group list-group-flush"
                        style={{ maxHeight: "" }}
                      >
                        <div
                          style={{ overflow: "scroll", overflowX: "hidden" }}
                        >
                          {courseVideos.map((video, i) => {
                            if (true == true) {
                              return <RelatedVideos key={i} video={video} />;
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </Row>
          </Col>
        </Row>
        <Row className="pt-4 w-100">
          <Col className="mx-0 px-0 pb-4">
            <CodeEditor />
          </Col>
        </Row>
      </Container>
    );
  }
}
