import React from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { LANGUAGE_VERSIONS } from "./languages";
import "./LanguagePicker.css";
const languages = Object.entries(LANGUAGE_VERSIONS);

function capitaliseLanguage(language) {
  return language.charAt(0).toUpperCase() + language.slice(1);
}

const LanguagePicker = ({ language, onSelect }) => {
  return (
    <Container className="dropdown text-start">
      <Dropdown className="mb-3">
        <Dropdown.Toggle id="dropdown-basic" className="fs-6">
          {capitaliseLanguage(language)}
        </Dropdown.Toggle>

        <Dropdown.Menu className="themeColours">
          {languages.map(([language, version]) => (
            <Dropdown.Item
              key={language}
              onClick={() => onSelect(language)}
              className="itemText"
            >
              {capitaliseLanguage(language)}

              <p>{version}</p>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default LanguagePicker;
