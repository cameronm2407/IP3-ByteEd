import { useEffect, useRef } from "react";

function VideoPlayer(props) {
  const { width, height, videoLink } = props;
  const cloudinaryRef = useRef();
  const videoRef = useRef();
  useEffect(() => {
    if (cloudinaryRef.current) return;
    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: "v1710627955",
    });
  }, []);
  return (
    <div>
      <video
        ref={videoRef}
        data-cld-public-id={videoLink}
        className="cld-video-player cld-fluid"
        controls
        data-cld-colors='{ "base": "#000", "accent": "#1b294b", "text": "#BDA1CC" }'
        data-cld-autoplay-mode="on-load"
      />
    </div>
  );
}

export default VideoPlayer;
