import "./Card.css";

export default function Featured({ title, imageUrl, videoLink }) {
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
    </div>
  );
}
