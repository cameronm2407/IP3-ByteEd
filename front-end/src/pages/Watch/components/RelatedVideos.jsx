import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
function RelatedVideos(video) {
  console.log(video.video);
  const routeChange = "/watch/" + video.video._id;
  const title = video.video.title;
  const thumbnail = video.video.thumbnail;

  return (
    <Container className="">
      <Row className="">
        {
          <div className="">
            <div className="position-relative w-100 border border-3">
              <div
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                Other Videos In Course
              </div>
              <Dropdown.Item style={{ background: "#d3b2e5" }}>
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
