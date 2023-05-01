import { ActivitiesContext } from '../ActivitiesContext';
import React, { useContext } from 'react';


function SortBar({}) {
    const { sortByName, sortByCost } = useContext(ActivitiesContext)
 
    return (
    <>
    <div className="sort-bar">
        <p>This is the sort bar component</p>
        <button onClick={sortByName}>Sorty By Name</button>
        <button onClick={sortByCost}>Sort By Cost</button>
    </div>
    </>
    );
};

export default SortBar;