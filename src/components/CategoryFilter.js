// components/CategoryFilter.js
import React from 'react';

const CategoryFilter = ({ setCategory }) => {
  return (
    <input
      type="text"
      placeholder="Filter by category..."
      onChange={(e) => setCategory(e.target.value)}
    />
  );
}

export default CategoryFilter;
