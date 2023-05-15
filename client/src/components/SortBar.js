import { ActivitiesContext } from '../ActivitiesContext';
import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


function SortBar() {
    const { sortByName, sortByCost } = useContext(ActivitiesContext)
 
    return (
    <>
    <Paper className="sort-bar">
        <Button onClick={sortByName}>Sort Alphabetically</Button>
        <Button onClick={sortByCost}>Sort By Cost</Button>
    </Paper>
    </>
    );
};

export default SortBar;