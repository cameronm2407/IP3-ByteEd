import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ObjectID from "bson-objectid";
import getCurrentUser from "../../../utils/currentUser.js";

function AddCourseForm() {
  const [courseUrl, setCourseUrl] = useState("");
  const [courseVideoUrl, setCourseVideoUrl] = useState("");
  const [courseVideoThumbnailUrl, setCourseVideoThumbnailUrl] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [duration, setDuration] = useState("");
  const [videoData, setVideoData] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  const courseID = ObjectID().toString();

  const generateVideoId = () => ObjectID().toString();
  let currentVideoId = generateVideoId();

  const addNewVideo = () => {
    const user = getCurrentUser();
    let newVideo = {
      title: videoTitle,
      duration: duration,
      description: videoDescription,
      course_content: true,
      position: videoData.length + 1,
      url: courseVideoUrl,
      thumbnail: courseVideoThumbnailUrl,
      creator: user._id,
      _id: currentVideoId,
    };

    setVideoData(videoData.concat(newVideo));
    console.log(videoData);

    // Resetting the form fields for video information
    setVideoTitle("");
    setVideoDescription("");
    setCourseVideoUrl("");
    setCourseVideoThumbnailUrl("");
    setDuration("");
  };

  const handleCourseVideoSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:443/api/content/course/upload/course-content?courseId=${courseID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videos: videoData }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setShowForm(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleCourseSubmit = async (event) => {
    const user = getCurrentUser();
    event.preventDefault();
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
        },
        body: JSON.stringify(course),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
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

  var CoursevideoWidget = cloudinary.createUploadWidget(
    {
      cloudName: "shared-env",
      uploadPreset: "ml_default",
      folder: "IP3-ByteEd-resources/videos",
      clientAllowedFormats: ["mp4"],
      publicId: `video_id_${currentVideoId}`,
    },
    (error, result) => {
      if (error) {
        console.error("Upload Widget error:", error);
        return;
      }
      if (result && result.event === "success") {
        console.log("File uploaded successfully:", result.info);
        setCourseVideoUrl(result.info.url);
        setDuration(result.info.duration);
      }
    }
  );
  const openCourseVideoCloudinaryWidget = () => {
    CoursevideoWidget.open();
  };

  var CoursevideoThumbnailWidget = cloudinary.createUploadWidget(
    {
      cloudName: "shared-env",
      uploadPreset: "ml_default",
      folder: "IP3-ByteEd-resources/course_thumbnails",
      clientAllowedFormats: ["png", "jpeg", "jpg"],
      publicId: `image_id_${currentVideoId}`,
    },
    (error, result) => {
      if (error) {
        console.error("Upload Widget error:", error);
        return;
      }
      if (result && result.event === "success") {
        console.log("File uploaded successfully:", result.info);
        setCourseVideoThumbnailUrl(result.info.url);
      }
    }
  );
  const openCourseVideoThumbnailCloudinaryWidget = () => {
    CoursevideoThumbnailWidget.open();
  };

  if (showForm) {
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
          <Form.Label htmlFor="course-description">
            Course Description
          </Form.Label>
          <Form.Control id="course-description" name="course-description" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="course-language">
            Programming Language
          </Form.Label>
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
          showForm={showForm}
        >
          Add Course Videos
        </Button>
      </Form>
    );
  } else {
    return (
      <Form onSubmit={handleCourseVideoSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="video-title">Video-Title</Form.Label>
          <Form.Control
            id="video-title"
            name="video-title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="video-description">
            Course Description
          </Form.Label>
          <Form.Control
            id="video-description"
            name="video-description"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label></Form.Label>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Button
              className="text-dark btn-light"
              onClick={openCourseVideoCloudinaryWidget}
              style={{ width: "200px", backgroundColor: "#BDA1CC" }}
            >
              Upload Video
            </Button>
            <Form.Control
              type="text"
              readOnly
              value={courseVideoUrl}
              placeholder="Video URL will appear here..."
              style={{ flexGrow: 1 }}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label></Form.Label>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Button
              className="text-dark btn-light"
              onClick={openCourseVideoThumbnailCloudinaryWidget}
              style={{ width: "200px", backgroundColor: "#BDA1CC" }}
            >
              Upload Thumbnail
            </Button>
            <Form.Control
              type="text"
              readOnly
              value={courseVideoThumbnailUrl}
              placeholder="Thumbnail URL will appear here..."
              style={{ flexGrow: 1 }}
            />
          </div>
        </Form.Group>

        <Button
          className="w-100 mb-1 text-dark btn-light"
          style={{ backgroundColor: "#BDA1CC" }}
          onClick={addNewVideo}
        >
          Add Another Video
        </Button>

        <Button
          className="w-100 mb-1 text-dark btn-light"
          type="submit"
          style={{ backgroundColor: "#BDA1CC" }}
        >
          Submit Course
        </Button>
      </Form>
    );
  }
}

export default AddCourseForm;
