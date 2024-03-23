import React from "react";
import { Container } from "react-bootstrap";
import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";
import LanguagePicker from "./LanguagePicker";

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
  };
  const defaultComment = "// Start Coding!";
  if (language == "python") {
  }
  return (
    <Container>
      <LanguagePicker
        language={language}
        onSelect={onSelect}
        className="end-0"
      />
      <Editor
        height="30vh"
        language={language}
        defaultValue="// Start Coding!"
        theme="vs-dark"
        value={value}
        onChange={(value, event) => setValue(value)}
        onMount={onMount}
      />
    </Container>
  );
}

export default CodeEditor;
