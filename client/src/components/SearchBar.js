import React, { useState } from 'react';

function SearchBar({activities, setActivities}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState("");


    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
      };

    const filteredActivities = activities.filter((activity) => {
    const titleMatch =
        activity.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    const neighborhoodMatch =
        activity.neighborhood.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
        -1;
    const filterMatch = selectedFilter === "" || activity.type === selectedFilter;
    return titleMatch || neighborhoodMatch && filterMatch;
    });

    const filterOptions = [
        { value: "", label: "All" },
        { value: "outdoor", label: "Outdoor" },
        { value: "indoor", label: "Indoor" },
      ];
 
    return (
    <>
    <div>
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
        <select value={selectedFilter} onChange={handleFilterChange}>
            {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        <ul>
            {filteredActivities.map((activity) => (
            <li key={activity.id}>
                {activity.title} ({activity.neighborhood})
            </li>
            ))}
        </ul>
    </div> 
    </>
    );
};

export default SearchBar;