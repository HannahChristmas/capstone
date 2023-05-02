import { ActivitiesContext } from '../ActivitiesContext';
import React, { useContext } from 'react';


function SortBar() {
    const { sortByName, sortByCost } = useContext(ActivitiesContext)
 
    return (
    <>
    <div className="sort-bar">
        <p>This is the sort bar component</p>
        <button onClick={sortByName}>Sort Alphabetically</button>
        <button onClick={sortByCost}>Sort By Cost</button>
    </div>
    </>
    );
};

export default SortBar;