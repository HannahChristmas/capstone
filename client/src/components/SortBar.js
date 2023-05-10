import { ActivitiesContext } from '../ActivitiesContext';
import React, { useContext } from 'react';
import Button from '@mui/material/Button';


function SortBar() {
    const { sortByName, sortByCost } = useContext(ActivitiesContext)
 
    return (
    <>
    <div className="sort-bar">
        <Button onClick={sortByName}>Sort Alphabetically</Button>
        <Button onClick={sortByCost}>Sort By Cost</Button>
    </div>
    </>
    );
};

export default SortBar;