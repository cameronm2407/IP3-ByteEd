import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ObjectID from "bson-objectid";

// utils
import getCurrentUser from "../../../utils/currentUser.js";

function AddVideoForm() {
  const token = localStorage.getItem("token");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [duration, setDuration] = useState("");

  const VideoID = ObjectID().toString();

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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(video),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      VideoWidget.close({ quiet: true });
      ThumbnailoWidget.close({ quiet: true });

      setVideoUrl("");
      setThumbnailUrl("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <Form onSubmit={handleVideoSubmit}>
      <Form.Group className="mb-3">
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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

      <Form.Group className="mb-3">
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
        <Form.Label htmlFor="video-description">Video Description</Form.Label>
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
  );
}

export default AddVideoForm;
