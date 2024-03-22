import React, { useState } from "react";
import "./search.css";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVideoResults, setVideoSearchResults] = useState([]);
  const [searchPlaylistResults, setPlaylistSearchResults] = useState([]);
  const [showVideoResults, setVideoShowResults] = useState(false);
  const [showPlaylistResults, setPlaylistShowResults] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setVideoShowResults(false); // Reset results when input changes
    setPlaylistShowResults(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      // Check if searchTerm is not empty before triggering the search
      setVideoShowResults(true);
      setPlaylistShowResults(true);
      handleSearch(searchTerm);
    }
  };

  const handleSearch = (searchTerm) => {
    // SEARCH WILL BE HANDLED HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const videoResults = ["Uno", "Dos"];
    const playlistResults = ["Tres", "Quatro"];
    setVideoSearchResults(videoResults);
    setPlaylistSearchResults(playlistResults);
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
      {showVideoResults && (
        <div className="video-search-results">
          {searchVideoResults.length === 0 ? (
            <p>No videos found for '{searchTerm}'</p>
          ) : (
            <>
              <p>Video results for: '{searchTerm}'</p>
              <ul>
                {searchVideoResults.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {showPlaylistResults && (
        <div className="playlist-search-results">
          {searchPlaylistResults.length === 0 ? (
            <p>No courses found for '{searchTerm}'</p>
          ) : (
            <>
              <p>Course results for: '{searchTerm}'</p>
              <ul>
                {searchPlaylistResults.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
