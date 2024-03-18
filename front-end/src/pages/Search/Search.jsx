import React, { useState, useEffect } from 'react';
import './search.css';

// ------------ Search Bar -------------- //
const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div className="searchContainer">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Browse courses and videos..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
};

const SearchResults = ({ results }) => {
    return (
        <div className="search-results">
            {results.map((result, index) => (
                <div key={index}>{result}</div>
            ))}
        </div>
    );
};

export default function Home() {
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/testdata.txt')
            .then(response => response.text())
            .then(text => {
                console.log('Fetched data:', text);
                const lines = text.split('\n');
                setData(lines.filter(line => line.trim())); // Filter out empty lines
                setIsLoading(false); // Data loading complete
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false); // Set loading to false in case of error
            });
    }, []);

    const handleSearch = (searchTerm) => {
        console.log('Search term:', searchTerm);
        const filteredResults = data.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log('Filtered results:', filteredResults);
        setSearchResults(filteredResults);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log('Search results:', searchResults);

    // ------------ Return -------------- //
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={searchResults} />
        </div>
    );
}
