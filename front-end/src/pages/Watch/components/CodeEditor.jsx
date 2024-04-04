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
    <Container className="mw-100">
      <Row>
        <Col className="col-8">
          <LanguagePicker
            language={language}
            onSelect={onSelect}
            className="end-0"
          />
          <Editor
            className="border border-3"
            height="22vh"
            language={language}
            defaultValue={HELLO_WORLD[language]}
            theme="vs-dark"
            value={value}
            onChange={(value) => setValue(value)}
            onMount={onMount}
          />
        </Col>
        <Col className="col-4">
          <Output editorRef={editorRef} language={language} />
        </Col>
      </Row>
    </Container>
  );
}

export default CodeEditor;
