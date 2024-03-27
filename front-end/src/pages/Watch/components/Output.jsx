import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { executeCode } from "./codeAPI";
import "./Output.css"
const Output = ({ language, editorRef }) => {
  const [output, setOutput] = useState("");
  const arrow = "> ";
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <p>Output</p>
        <Button onClick={runCode}>Execute Code</Button>
      </Row>
      <Row className="text-start border border-2 outputBox">
        <p style={{ color: "white", fontFamily: "consolas"}}>
          {arrow}{output ? output : 'Press "Execute Code".'}
        </p>
      </Row>
    </Container>
  );
};

export default Output;
