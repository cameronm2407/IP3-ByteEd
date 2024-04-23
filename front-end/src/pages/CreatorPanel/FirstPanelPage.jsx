import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import getCurrentUser from "../../utils/currentUser";
import "bootstrap/dist/css/bootstrap.min.css";

function FirstPanelPage() {
  const [user, setUser] = useState(null);
  let id = "";
  useEffect(() => {
    const user = getCurrentUser();
    setUser(user); // Setting the user state
  }, []);
  if (user) {
    console.log(user._id);
    id = user._id;
  }

  const courselink = "/creatorPanel/courses/" + id;
  const singlelink = "/creatorPanel/videos/" + id;

  return (
    <Container>
      <Row>
        <h1 className="mt-4">
          Would you like to view your courses or your single non-course videos?
        </h1>
      </Row>
      <Row className="d-flex gap-2 mb-5 justify-content-center mt-4">
        <Button
          href={courselink}
          style={{
            transition: "all 0.3s ease-in-out",
            width: "25%",
            height: "50px",
            backgroundColor: "#BDA1CC",
            borderColor: "#BDA1CC",
            color: "#000",
          }}
        >
          Courses
        </Button>
        <Button
          href={singlelink}
          style={{
            transition: "all 0.3s ease-in-out",
            width: "25%",
            height: "50px",
            backgroundColor: "#BDA1CC",
            borderColor: "#BDA1CC",
            color: "#000",
          }}
        >
          Single Videos
        </Button>
      </Row>
    </Container>
  );
}

export default FirstPanelPage;
