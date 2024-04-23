import Carosel from "./Carousel/CarouselP.jsx";
import Featured from "./Featured/Featured.jsx";
import ImproveIn from "./ImproveIn/ImproveIn.jsx";
import Videos from "../Course/CourseVideos.jsx";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

export default function Home() {
  const [videos, setVideos] = useState([]);
  let limit = 6;
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:443/api/content/video`);
      const videos = (await response.json()).videos;
      setVideos(videos);
      console.log(videos);
    })();
  }, []);
  return (
    <div className="app-container d-flex flex-column align-items-center w-100">
      <Carosel />
      <ImproveIn />
      <h1>Featured</h1>
      <div className="text-center">
        <Row>
          {videos.slice(0, 6).map((video, i) => (
            <Featured
              key={i}
              title={video.title}
              imageUrl={video.thumbnail}
              videoLink={video.url}
            />
          ))}
        </Row>
      </div>
    </div>
  );
}
