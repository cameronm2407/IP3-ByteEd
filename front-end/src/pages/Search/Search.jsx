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

const SearchCard = (data, key) => {
  console.log(data);
  // Check if data is a course
  if (data.programming_language) {
    return (
      //<a href={`/course/${data._id}`} className="link">
      <div key={key} className="searchCard">
        <img
          src={data.thumbnail}
          key={key}
          style={{ width: "100%", height: "100%" }}
        />
        <div className="title">{data.name}</div>
        <div className="difficulty">Difficulty: {data.difficulty}</div>
        <div className="programmingLanguage">
          Language: {data.programming_language}
        </div>
        <div className="description">{data.description}</div>
      </div>
      //</a>
    );
  } else {
    // Render video card
    return (
      <a href={`/watch/${data._id}`} className="link">
        <div key={key} className="searchCard">
          <img
            src={data.thumbnail}
            key={key}
            style={{ width: "100%", height: "100%" }}
          />
          <div className="title">{data.title}</div>
          <div className="duration">
            {convertDuration(data.duration_seconds)}
          </div>
          <div className="description">{data.description}</div>
        </div>
      </a>
    );
  }
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVideoResult, setVideoSearchResult] = useState([]);
  const [searchCourseResult, setCourseSearchResult] = useState([]);
  const [searchVideoMessage, setVideoSearchMessage] = useState("");
  const [searchCourseMessage, setCourseSearchMessage] = useState("");

  useEffect(() => {
    const fn = async () => {
      const res = await fetch("http://localhost:443/api/content/video");
      const data = await res.json();
      setVideoSearchResult(data.videos);
      setCourseSearchResult(data.courses);
    };
    fn();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderCards = (data) => {
    if (!data || data.length === 0) {
      return null; // Return null or handle empty state
    }
    return data.map((entry, index) => SearchCard(entry, index + 1));
  };

  const handleSearch = async (searchTerm) => {
    const res = await fetch(
      `http://localhost:443/api/content/search?st=${searchTerm}`
    );
    const data = await res.json();
    if (data.searchResult.videos.length > 0) {
      setVideoSearchResult(
        data.searchResult.videos.filter((video) => !video.course_content)
      );
      setVideoSearchMessage(`Video results found for "${searchTerm}"`);
    } else {
      setVideoSearchResult([]);
      setVideoSearchMessage(`No videos found for "${searchTerm}"`);
    }
    if (data.searchResult.courses.length > 0) {
      setCourseSearchResult(data.searchResult.courses);
      setCourseSearchMessage(`Course results found for "${searchTerm}"`);
    } else {
      setCourseSearchResult([]);
      setCourseSearchMessage(`No courses found for "${searchTerm}"`);
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
      {searchCourseMessage && (
        <div className="search-message">{searchCourseMessage}</div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginLeft: "150px",
        }}
        className="content"
      >
        {renderCards(searchCourseResult)}
      </div>
      {searchVideoMessage && (
        <div className="search-message">{searchVideoMessage}</div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginLeft: "150px",
        }}
        className="content"
      >
        {renderCards(searchVideoResult)}
      </div>
    </div>
  );
}
