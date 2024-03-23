import React from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { LANGUAGE_VERSIONS } from "./languages";
import "./LanguagePicker.css";
const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguagePicker = ({ language, onSelect }) => {
  return (
    <Container class="top-box animatedq fadeInDownq clearfix">
      <Dropdown class="top-box animatedq fadeInDownq clearfix">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {language}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {languages.map(([language, version]) => (
            <Dropdown.Item key={language} onClick={() => onSelect(language)}>
              {language}
              &nbsp;
              <p>{version}</p>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default LanguagePicker;
