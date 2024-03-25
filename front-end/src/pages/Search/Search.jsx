import { useState, useEffect } from "react";
import "./search.css";

function convertDuration(videoLength) {
  let videoTime = "";
  if (videoLength >= 3600) {
    const hours = Math.floor(videoLength / 3600);
    const minutes = Math.round((videoLength % 3600) / 60);
    if (hours > 100) {
      videoTime = "100+ Hours";
    } else {
      videoTime = `${hours} Hours`;
      if (minutes > 0) {
        videoTime += ` ${minutes} Minutes`;
      }
    }
  } else {
    videoTime = `${Math.round(videoLength / 60)} Minutes`;
  }
  return videoTime;
}

const Card = (data, key) => {
  console.log(data);
  return (
    <div key={key} className="card">
      <img
        src={data.thumbnail}
        key={key}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="title">
        <a href={`/watch/${data._id}`}>{data.title}</a>
      </div>
      <div className="duration">{convertDuration(data.duration_seconds)}</div>
      <div className="description">{data.description}</div>
    </div>
  );
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    const fn = async () => {
      const res = await fetch("http://localhost:443/api/content/videos");
      const data = await res.json();
      setSearchResult(data.videos);
    };
    fn();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderCards = (data) =>
    data.map((entry, index) => Card(entry, index + 1));
  const handleSearch = async (searchTerm) => {
    const res = await fetch(
      `http://localhost:443/api/content/search?st=${searchTerm}`
    );
    const data = await res.json();
    if (data.searchResult.length > 0) {
      setSearchResult(data.searchResult);
      setSearchMessage(`Results found for "${searchTerm}"`);
    } else {
      setSearchResult([]);
      setSearchMessage(`No results found for "${searchTerm}"`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Browse courses and videos..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="search-button" type="submit" />
      </form>
      {searchMessage && <div className="search-message">{searchMessage}</div>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginLeft: "150px",
        }}
        className="content"
      >
        {renderCards(searchResult)}
      </div>
    </div>
  );
}
