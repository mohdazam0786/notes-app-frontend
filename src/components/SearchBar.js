// components/SearchBar.js
import React from 'react';

const SearchBar = ({ setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
