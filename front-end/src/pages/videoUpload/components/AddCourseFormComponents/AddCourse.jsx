import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import getCurrentUser from "../../../../utils/currentUser.js";

export default function AddCourse({ setShowForm, courseID }) {
  const token = localStorage.getItem("token");
  const [courseUrl, setCourseUrl] = useState("");

  const handleCourseSubmit = async event => {
    event.preventDefault();
    const user = getCurrentUser();

    const formData = new FormData(event.target);

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
      _id: courseID,
    };
    console.log(course);

    try {
      const response = await fetch("http://localhost:443/api/content/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      CourseThumbnailoWidget.close({ quiet: true });

      setShowForm(false);
      setCourseUrl("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  var CourseThumbnailoWidget = cloudinary.createUploadWidget(
    {
      cloudName: "shared-env",
      uploadPreset: "ml_default",
      folder: "IP3-ByteEd-resources/course_thumbnails",
      clientAllowedFormats: ["png", "jpeg", "jpg"],
      publicId: `image_id_${courseID}`,
    },
    (error, result) => {
      if (error) {
        console.error("Upload Widget error:", error);
        return;
      }
      if (result && result.event === "success") {
        console.log("File uploaded successfully:", result.info);
        setCourseUrl(result.info.url);
      }
    }
  );
  const openCourseThumbnailCloudinaryWidget = () => {
    CourseThumbnailoWidget.open();
  };

  return (
    <Form onSubmit={handleCourseSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="course-name">Course Name</Form.Label>
        <Form.Control id="course-name" name="course-name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label></Form.Label>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
        <Form.Label htmlFor="course-description">Course Description</Form.Label>
        <Form.Control id="course-description" name="course-description" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="course-language">Programming Language</Form.Label>
        <Form.Select
          id="course-language"
          name="course-language"
          defaultValue=""
        >
          <option value="" disabled>
            Select Language
          </option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="Javascript">Javascript</option>
          <option value="Html">HTML</option>
          <option value="C-sharp">C#</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="course-difficulty">Course Difficulty</Form.Label>
        <Form.Select
          id="course-difficulty"
          name="course-difficulty"
          defaultValue=""
        >
          <option value="" disabled>
            Select Difficulty
          </option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="course-tags">Course Tags</Form.Label>
        <Form.Control id="course-tags" placeholder="" name="course-tags" />
      </Form.Group>

      <Button
        className="w-100 mb-1 text-dark btn-light"
        type="submit"
        style={{ backgroundColor: "#BDA1CC" }}
      >
        Add Course Videos
      </Button>
    </Form>
  );
}
