import React from "react";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "./carousel.css";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpeg";
import image3 from "./images/image3.jpg";

function CarouselP() {
  return (
    <div className="w-100">
      <Carousel variant="dark" className="w-100">
        <Carousel.Item>
          <img
            style={{ height: "50vh", objectFit: "cover" }}
            className="d-block w-100"
            src={image1}
          />
          <Carousel.Caption>
            <h5>Learn Like Never Before. Join Us Now!</h5>
            <div>
              <NavLink to="/login">
                <button className="btn button-primary">Login</button>{" "}
              </NavLink>
              <NavLink to="/register">
                <button className="btn button-secondary">Signup</button>{" "}
              </NavLink>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "50vh", objectFit: "cover" }}
            className="d-block w-100"
            src={image2}
          />
          <Carousel.Caption>
            <h5>Learn this and that...</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "50vh", objectFit: "cover" }}
            className="d-block w-100"
            src={image3}
          />
          <Carousel.Caption>
            <h5>Also learn this...</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselP;
