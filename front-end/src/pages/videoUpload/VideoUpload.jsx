import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";

// components
import HeaderImage from "./components/HeaderImage.jsx";
import FormToggle from "./components/formToggle.jsx";
import AddCourseForm from "./components/AddCourseForm.jsx";
import AddVideoForm from "./components/AddVideoForm.jsx";

export default function VideoUploadFormList() {
  const [showForm, setShowForm] = useState("new");

  const handleShowExistingCourseForm = () => {
    setShowForm("existing");
  };

  const handleShowNewCourseForm = () => {
    setShowForm("new");
  };
  
  return (
    <Container className="custom-container">
      <HeaderImage />

      <Card
        className="mx-5 mb-5 p-5 shadow"
        style={{
          marginTop: "-150px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <Card.Body className="text-center">
        <FormToggle
          showForm={showForm}
          onShowExistingCourseForm={handleShowExistingCourseForm}
          onShowNewCourseForm={handleShowNewCourseForm}
        />

          {/* Uplouad Video Section */}
          {showForm === "existing" && (
            <AddVideoForm />
          )}

          {/* Create Course Section */}
          {showForm === "new" && (
            <AddCourseForm />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
