import React, { useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";

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
      <div
        className="bg-image"
        style={{
          backgroundImage:
            "url(https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202206/MIT_3Q-Computing-Power-01_0.jpg?itok=uQmUuyqI)",
          height: "200px",
          width: "100vw",
          margin: "0",
          padding: "0",
        }}
      ></div>

      <Card
        className="mx-5 mb-5 p-5 shadow"
        style={{
          marginTop: "-150px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <Card.Body className="text-center">
          <div className="d-flex gap-2 mb-5 justify-content-center">
            <Button
              style={{
                transition: "all 0.3s ease-in-out",
                width: showForm === "existing" ? "50%" : "25%",
                height: "50px",
                backgroundColor:
                  showForm === "existing" ? "#BDA1CC" : "transparent",
                borderColor: "#BDA1CC",
                color: "#000", // Set text color to black
              }}
              onClick={handleShowExistingCourseForm}
            >
              Add Video(s)
            </Button>
            <Button
              style={{
                transition: "all 0.3s ease-in-out",
                width: showForm === "new" ? "50%" : "25%",
                height: "50px",
                backgroundColor: showForm === "new" ? "#BDA1CC" : "transparent",
                borderColor: "#BDA1CC",
                color: "#000", // Set text color to black
              }}
              onClick={handleShowNewCourseForm}
            >
              Create a New Course
            </Button>
          </div>

          {showForm === "existing" && (
            <Form>
              <Form.Group className="mb-3">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button
                    className="text-dark btn-light"
                    style={{ width: "200px", backgroundColor: "#BDA1CC" }}
                  >
                    Upload Video
                  </Button>
                  <Form.Control
                    type="text"
                    readOnly
                    value=""
                    placeholder="Avatar URL will appear here..."
                    style={{ flexGrow: 1 }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="course-name">Video Name</Form.Label>
                <Form.Control id="course-name" placeholder="" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="programming-language">
                  Video Description
                </Form.Label>
                <Form.Control id="programming-language" placeholder="" />
              </Form.Group>

              <Button
                className="w-100 mb-1 text-dark btn-light"
                type="submit"
                style={{ backgroundColor: "#BDA1CC" }}
              >
                Submit
              </Button>
            </Form>
          )}

          {showForm === "new" && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="new-course-name">
                  New Course Name
                </Form.Label>
                <Form.Control id="new-course-name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="course-difficulty">
                  Course Difficulty
                </Form.Label>
                <Form.Select id="course-difficulty">
                  <option value="" disabled selected>
                    Select Difficulty
                  </option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="programming-language-new">
                  Programming Language
                </Form.Label>
                <Form.Select id="course-language">
                  <option value="" disabled selected>
                    Select Language
                  </option>
                  <option value="">Python</option>
                  <option value="beginner">Java</option>
                  <option value="intermediate">Javascript</option>
                  <option value="advanced">Html</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="course-description">
                  Course Description
                </Form.Label>
                <Form.Control id="course-description" />
              </Form.Group>
              <Button
                className="w-100 mb-1 text-dark btn-light"
                type="submit"
                style={{ backgroundColor: "#BDA1CC" }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
