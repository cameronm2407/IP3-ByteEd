import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CourseVideos(video) {
  const thumbnail = video.video.thumbnail;
  const title = video.video.title;
  const navigate = useNavigate();

  const routeChange = () => {
    const link = "/watch/" + video.video._id;
    navigate(link);
    window.location.reload();
  };

  return (
    <Container>
      <Row>
        <a onClick={routeChange} style={{ textDecoration: "none" }}>
          <span className="col-4 ">
            <img
              src={thumbnail}
              style={{
                position: "relative",
                height: "70px",
                zIndex: 9999,
              }}
            />
          </span>
          <span
            className="col-8"
            style={{
              color: "black",
              position: "relative",
              overflow: "hidden",
              fontSize: "15px",
              marginLeft: "10px",
            }}
            id="anchor-related"
          >
            {title.length > 40 ? (
              <span id="long-characters">{title}</span>
            ) : (
              <span style={{ transform: "none" }}>{title}</span>
            )}
          </span>
        </a>
      </Row>
    </Container>
  );
}

export default CourseVideos;
