import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";
import LanguagePicker from "./LanguagePicker";
import { HELLO_WORLD } from "./languages";
import Output from "./Output";

function CodeEditor() {
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(HELLO_WORLD[language]);
  };

  return (
    <Container>
      <Row className="text-start">
        <LanguagePicker
          language={language}
          onSelect={onSelect}
          className="end-0"
        />
      </Row>
      <Row>
        <Col>
          <Editor
            height="30vh"
            language={language}
            defaultValue={HELLO_WORLD[language]}
            theme="vs-dark"
            value={value}
            onChange={(value) => setValue(value)}
            onMount={onMount}
          />
        </Col>
        <Col>
          <Output editorRef={editorRef} language={language} />
        </Col>
      </Row>
    </Container>
  );
}

export default CodeEditor;
