import "./Card.css";

export default function Featured({ title, imageUrl, id }) {
  let link = "/watch/" + id;
  return (
    <div className="card-container">
      <div className="image-container">
        <a href={link}>
          <img src={imageUrl} alt="" className="video-thumbnail" />
        </a>
      </div>
      <div className="card-title">
        <a href={link}>
          <h4 className="ellipsis">{title}</h4>
        </a>
      </div>
    </div>
  );
}
