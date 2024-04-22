import { Container, Spinner, Row } from "react-bootstrap";

function Loading(props) {
  return (
    <Container className="position-absolute top-50 start-50">
      <Row>
        <h2>Loading...</h2>
      </Row>
      <Row>
        <Spinner variant="primary" animation="border"></Spinner>
      </Row>
    </Container>
  );
}

export default Loading;
