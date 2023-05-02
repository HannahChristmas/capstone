import React, { useContext, useState } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';

function SearchBar() {
    const { activities } = useContext(ActivitiesContext)
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredActivities = activities.filter(activity => {
        const { title, neighborhood, website } = activity;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
          title.toLowerCase().includes(lowerCaseQuery) ||
          neighborhood.toLowerCase().includes(lowerCaseQuery) ||
          website.toLowerCase().includes(lowerCaseQuery)
        );
    });

    return (
    <>
    <div className="activity-search-container">
        <h4>This is the search bar component</h4>
            <p>search by keyword...</p>
            <p>location ↓</p>
            <p>category ↓</p>
            <p>add an activity</p>
    </div>
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      <ul>
        {filteredActivities.map(activity => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </ul>
    </div>
    </>
    );
};

export default SearchBar;