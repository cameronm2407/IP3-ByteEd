import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { executeCode } from "./codeAPI";
import Toast from "react-bootstrap/Toast";

import "./Output.css";

function DismissibleToast() {}
const Output = ({ language, editorRef }) => {
  const [output, setOutput] = useState("");
  const arrow = "> ";
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);

  const toggleShowToast = () => setShowToast(!showToast);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setShowToast(false);
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      setToastMessage(error.message);
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row className="executeButton">
        <Button onClick={runCode} className="mb-3" id="execute-button">
          {isLoading ? "Executing..." : "Execute Code"}
        </Button>
      </Row>
      <Toast
        className="position-absolute start-50 top-50 translate-middle"
        show={showToast}
        onClose={toggleShowToast}
        bg="danger"
        style={{ width: 200, height: 100, zIndex: 999 }}
      >
        <Toast.Header>
          <strong className="mr-auto">Execution Error</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
      <Row
        className={
          isError
            ? "text-start border border-3 outputBox border-danger"
            : "text-start border border-3 outputBox border-white"
        }
      >
        <p
          style={{ fontFamily: "consolas" }}
          className={isError ? "text-danger" : "text-white"}
        >
          {arrow}
          {output
            ? output.map((line, i) => <p key={i}>{line}</p>)
            : 'Press "Execute Code".'}
        </p>
      </Row>
    </Container>
  );
};

export default Output;
