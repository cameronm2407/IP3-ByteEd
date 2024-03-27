import "./Card.css";
import StarRating from "./StarRating";

export default function Featured({
  title,
  imageUrl,
  rating,
  videoLink,
  videoLength,
}) {
  let videoTime = "";
  let remainder = 5;
  if (videoLength >= 60 && videoLength <= 6000) {
    videoTime = Math.round((videoLength / 60) * 2) / 2 + " Hours";
  } else if (videoLength > 6000) {
    videoTime = "100+ Hours";
  } else {
    videoTime = Math.round(videoLength) + " Minutes";
  }

  if (rating !== null) {
    remainder = 5 - rating;
  }
  return (
    <div className="card-container">
      <div className="image-container">
        <a href={videoLink}>
          <img src={imageUrl} alt="" className="video-thumbnail" />
        </a>
      </div>
      <div className="card-title">
        <a href={videoLink}>
          <h4 className="ellipsis">{title}</h4>
        </a>
      </div>
      <div className="card-time">
        <h4>{videoTime}</h4>
      </div>
      <div className="card-rating">
        <StarRating rating={rating} remainder={remainder} />
      </div>
    </div>
  );
}
