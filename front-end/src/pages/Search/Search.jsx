import React, { useState } from "react";
import "./search.css";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setShowResults(false); // Reset showResults when input changes
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowResults(true);
    handleSearch(searchTerm);
  };

  const handleSearch = (searchTerm) => {
    // Simulating search results
    // SEARCH WILL BE HANDLED HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const results = [];
    setSearchResults(results);
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
      {showResults && (
        <div className="search-results">
          {searchResults.length === 0 ? (
            <p>No results found for '{searchTerm}'</p>
          ) : (
            <>
              <p>Search results for: '{searchTerm}'</p>
              <ul>
                {searchResults.map((result, index) => (
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
