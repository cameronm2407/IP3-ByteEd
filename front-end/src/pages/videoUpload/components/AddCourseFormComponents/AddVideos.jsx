import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import ObjectID from "bson-objectid";
import getCurrentUser from "../../../../utils/currentUser.js";

export default function AddVideos({ setShowForm, courseID }) {
  const [videoData, setVideoData] = useState([]);
  const [duration, setDuration] = useState("");
  const [courseVideoUrl, setCourseVideoUrl] = useState("");
  const [courseVideoThumbnailUrl, setCourseVideoThumbnailUrl] = useState("");
  const [videoId] = useState(ObjectID().toString());
  let [counter, setCounter] = useState(1);
  const formRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(videoData);
  }, [videoData]);

  const handleAction = async (actionType) => {
    if (actionType === "addVideo") {
      const formData = new FormData(formRef.current);
      const user = getCurrentUser();
      let newVideo = {
        title: formData.get("video-title"),
        duration_seconds: duration,
        description: formData.get("video-description"),
        course_content: true,
        position: counter,
        url: courseVideoUrl,
        thumbnail: courseVideoThumbnailUrl,
        creator: user._id,
        _id: videoId,
      };
      console.log(newVideo);
      setVideoData([...videoData, newVideo]);

      setDuration("");
      setCourseVideoUrl("");
      setCourseVideoThumbnailUrl("");
    } else if (actionType === "submitCourse") {
      try {
        const response = await fetch(
          `http://localhost:443/api/content/course/upload/course-content?courseId=${courseID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(videoData),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setShowForm(false);
        CoursevideoWidget.close({ quiet: true });
        CoursevideoThumbnailWidget.close({ quiet: true });
        setCounter(counter++);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };

  var CoursevideoWidget = cloudinary.createUploadWidget(
    {
      cloudName: "shared-env",
      uploadPreset: "ml_default",
      folder: "IP3-ByteEd-resources/videos",
      clientAllowedFormats: ["mp4"],
      publicId: `video_id_${videoId}`,
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
      folder: "IP3-ByteEd-resources/video_thumbnails",
      clientAllowedFormats: ["png", "jpeg", "jpg"],
      publicId: `image_id_${videoId}`,
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

  return (
    <Form onSubmit={(e) => e.preventDefault()} ref={formRef}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="video-title">Video-Title</Form.Label>
        <Form.Control id="video-title" name="video-title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="video-description">Video Description</Form.Label>
        <Form.Control id="video-description" name="video-description" />
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
        onClick={() => handleAction("addVideo")}
      >
        Add Video
      </Button>

      <Button
        className="w-100 mb-1 text-dark btn-light"
        type="submit"
        style={{ backgroundColor: "#BDA1CC" }}
        onClick={() => handleAction("submitCourse")}
      >
        Submit Course
      </Button>
    </Form>
  );
}
