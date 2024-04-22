import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import getCurrentUser from "../../utils/currentUser";

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
        <h1>
          Would you like to view your courses or your single non-course videos?
        </h1>
      </Row>
      <Row>
        <Button href={courselink}>Courses</Button>
        <Button href={singlelink}>Single Videos</Button>
      </Row>
    </Container>
  );
}

export default FirstPanelPage;
