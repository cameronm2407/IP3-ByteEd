import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
function RelatedVideos(video) {
  const thisId = useParams();
  let isSelected = false;
  console.log();
  console.log(video.video);
  const routeChange = "/watch/" + video.video._id;
  const title = video.video.title;
  const thumbnail = video.video.thumbnail;

  if (thisId.videoId == video.video._id) {
    isSelected = true;
  }
  return (
    <Container className="">
      <Row className="">
        {
          <div className="">
            <div className="position-relative w-100 border border-3">
              <Dropdown.Item
                style={{ background: isSelected ? "#d3b2e5" : "#ffff" }}
              >
                <Container className="d-block container-fluid text-start">
                  <Row>
                    <a href={routeChange} style={{ textDecoration: "none" }}>
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
                        {title > 40 ? (
                          <span id="long-characters">{title}</span>
                        ) : (
                          <span style={{ transform: "none" }}>{title}</span>
                        )}
                      </span>
                    </a>
                  </Row>
                </Container>
              </Dropdown.Item>
            </div>
            <div style={{ textAlign: "end" }}></div>
          </div>
        }
      </Row>
    </Container>
  );
}

export default RelatedVideos;
