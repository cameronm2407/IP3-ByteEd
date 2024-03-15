import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Browse courses and videos..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default function Home() {
    const handleSearch = (searchTerm) => {
        // HANDLE SEARCH HERE
        console.log('Searching for:', searchTerm);
    };

    return (
        <SearchBar onSearch={handleSearch} />
    );
}
