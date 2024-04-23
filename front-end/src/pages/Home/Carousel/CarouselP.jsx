import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "./carousel.css";
// ----------------------------- //
import image1 from "./images/image1.png";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
//------------------------------//
function CarouselP() {
  return (
    <div className="w-100">
      <Carousel
        interval={5000}
        prevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        nextIcon={<FontAwesomeIcon icon={faChevronRight} />}
      >
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
                <button className="btn button-primary">Login</button>
              </NavLink>
              <NavLink to="/register">
                <button className="btn button-secondary">Signup</button>
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
            <h5>Your journey starts here!</h5>
            <div>
              <NavLink to="/search">
                <button className="btn button-primary">Browse courses</button>{" "}
              </NavLink>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "50vh", objectFit: "cover" }}
            className="d-block w-100"
            src={image3}
          />
          <Carousel.Caption>
            <h5>Proven Strategy to Learn Quick</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselP;
