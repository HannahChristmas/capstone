import React, { useContext } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';

function SearchBar() {
    const { handleSearchChange, searchQuery } = useContext(ActivitiesContext)

    return (
    <>
    <div className="activity-search-container">
        <h4>This is the search bar component</h4>
        <div>
          <input type="text" value={searchQuery} onChange={handleSearchChange} />
        </div>
            <p>search by keyword...</p>
            <p>location ↓</p>
            <p>category ↓</p>
            <p>add an activity</p>
    </div>
    
    </>
    );
};

export default SearchBar;