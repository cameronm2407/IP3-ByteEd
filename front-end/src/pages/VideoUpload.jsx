import React, { useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import ObjectID from "bson-objectid";
import getCurrentUser from "../utils/currentUser.js";

export default function VideoUploadFormList() {
  const [showForm, setShowForm] = useState("new");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [duration, setDuration] = useState("");

  const [courseUrl, setCourseUrl] = useState("");

  const handleShowExistingCourseForm = () => {
    setShowForm("existing");
  };

  const handleShowNewCourseForm = () => {
    setShowForm("new");
  };

  const VideoID = ObjectID().toString();
  const CourseID = ObjectID().toString();

  var ThumbnailoWidget = cloudinary.createUploadWidget(
    {
      cloudName: "shared-env",
      uploadPreset: "ml_default",
      folder: "IP3-ByteEd-resources/video_thumbnails",
      clientAllowedFormats: ["png", "jpeg", "jpg"],
      publicId: `image_id_${VideoID}`,
    },
    (error, result) => {
      if (error) {
        console.error("Upload Widget error:", error);
        return;
      }
      if (result && result.event === "success") {
        console.log("File uploaded successfully:", result.info);
        setThumbnailUrl(result.info.url); // Save the uploaded avatar URL
      }
    }
  );
  const openThumbnailCloudinaryWidget = () => {
    ThumbnailoWidget.open();
  };

  var VideoWidget = cloudinary.createUploadWidget(
    {
      cloudName: "shared-env",
      uploadPreset: "ml_default",
      folder: "IP3-ByteEd-resources/videos",
      clientAllowedFormats: ["mp4"],
      publicId: `video_id_${VideoID}`,
    },
    (error, result) => {
      if (error) {
        console.error("Upload Widget error:", error);
        return;
      }
      if (result && result.event === "success") {
        console.log("File uploaded successfully:", result.info.duration);
        setVideoUrl(result.info.url);
        setDuration(result.info.duration);
      }
    }
  );
  const openVideoCloudinaryWidget = () => {
    VideoWidget.open();
  };



  const handleVideoSubmit = async (event) => {
    const user = getCurrentUser();

    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    if (!videoUrl) {
      alert("Please select an avatar before submitting.");
      return;
    }

    if (!thumbnailUrl) {
      alert("Please select an avatar before submitting.");
      return;
    }

    const video = {
      title: formData.get("video-name"),
      url: videoUrl,
      thumbnail: thumbnailUrl,
      course_content: false,
      description: formData.get("video-description"),
      duration: duration,
      creator: user._id,
      _id: VideoID,
    };

    try {
      const response = await fetch(
        "http://localhost:443/api/content/video/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(video),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

// Course
  const handleCourseSubmit = async (event) => {
    const user = getCurrentUser();

    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    if (!courseUrl) {
      alert("Please select an course thumbnail before submitting.");
      return;
    }

    const course = {
      name: formData.get("course-name"),
      thumbnail: courseUrl,
      description: formData.get("course-description"),
      difficulty: formData.get("course-difficulty"),
      programming_language: formData.get("course-language"),
      tags: formData.get("course-tags"),
      creator: user._id,
      _id: CourseID,
    };

    try {
      const response = await fetch(
        "http://localhost:443/api/content/course",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(course),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  // Course section
  var CourseThumbnailoWidget = cloudinary.createUploadWidget(
    {
      cloudName: "shared-env",
      uploadPreset: "ml_default",
      folder: "IP3-ByteEd-resources/course_thumbnails",
      clientAllowedFormats: ["png", "jpeg", "jpg"],
      publicId: `image_id_${CourseID}`,
    },
    (error, result) => {
      if (error) {
        console.error("Upload Widget error:", error);
        return;
      }
      if (result && result.event === "success") {
        console.log("File uploaded successfully:", result.info);
        setCourseUrl(result.info.url); // Save the uploaded avatar URL
      }
    }
  );
  const openCourseThumbnailCloudinaryWidget = () => {
    CourseThumbnailoWidget.open();
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
              Add Video
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
              Create Course
            </Button>
          </div>

          {/* Create Video Section */}
          {showForm === "existing" && (
            <Form onSubmit={handleVideoSubmit}>
              {/* Video URL */}
              <Form.Group className="mb-3">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button
                    className="text-dark btn-light"
                    onClick={openVideoCloudinaryWidget}
                    style={{ width: "200px", backgroundColor: "#BDA1CC" }}
                  >
                    Upload Video
                  </Button>
                  <Form.Control
                    type="text"
                    readOnly
                    value={videoUrl}
                    placeholder="Video URL will appear here..."
                    style={{ flexGrow: 1 }}
                  />
                </div>
              </Form.Group>

              {/* Thumnail URL */}
              <Form.Group className="mb-3">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button
                    className="text-dark btn-light"
                    onClick={openThumbnailCloudinaryWidget}
                    style={{ width: "200px", backgroundColor: "#BDA1CC" }}
                  >
                    Upload Thumbnail
                  </Button>
                  <Form.Control
                    type="text"
                    readOnly
                    value={thumbnailUrl}
                    placeholder="Thumnail URL will appear here..."
                    style={{ flexGrow: 1 }}
                  />
                </div>
              </Form.Group>

              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="video-name">Video Name</Form.Label>
                <Form.Control
                  id="video-name"
                  required
                  placeholder=""
                  name="video-name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="video-description">
                  Video Description
                </Form.Label>
                <Form.Control
                  id="video-description"
                  placeholder=""
                  name="video-description"
                />
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

          {/* Create Course Section */}
          {showForm === "new" && (
            <Form onSubmit={handleCourseSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="course-name">Course Name</Form.Label>
                <Form.Control id="course-name" name="course-name" />
              </Form.Group>

              <Form.Group className="mb-3">
              <Form.Label></Form.Label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button
                    className="text-dark btn-light"
                    onClick={openCourseThumbnailCloudinaryWidget}
                    style={{ width: "200px", backgroundColor: "#BDA1CC" }}
                  >
                    Upload Thumbnail
                  </Button>
                  <Form.Control
                    type="text"
                    readOnly
                    value={courseUrl}
                    placeholder="Thumnail URL will appear here..."
                    style={{ flexGrow: 1 }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="course-description">
                  Course Description
                </Form.Label>
                <Form.Control
                  id="course-description"
                  name="course-description"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="course-language">
                  Programming Language
                </Form.Label>
                <Form.Select id="course-language" name="course-language">
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
                <Form.Label htmlFor="course-tags">Course Tags</Form.Label>
                <Form.Control
                  id="course-tags"
                  placeholder=""
                  name="course-tags"
                />
              </Form.Group>

              <Button
                className="w-100 mb-1 text-dark btn-light"
                type="submit"
                style={{ backgroundColor: "#BDA1CC" }}
              >
                Add Course Videos
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
