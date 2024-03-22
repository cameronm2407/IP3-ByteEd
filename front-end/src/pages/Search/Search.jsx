import { useState, useEffect } from "react";
import "./search.css";

const Card = (data, key) => {
  console.log(data);
  return (
    <div
      key={key}
      style={{ height: "250px", width: "420px", border: "none" }}
      className="card"
    >
      <img
        src={data.thumbnail}
        key={key}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="title">{data.title}</div>
    </div>
  );
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
    console.log(data);
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
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        className="content"
      >
        {renderCards(searchResult)}
      </div>
    </div>
  );
}
