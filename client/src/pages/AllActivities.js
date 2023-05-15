import React, { useContext } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';
import SearchBar from '../components/SearchBar';
import SortBar from '../components/SortBar';
import ActivityCard from './ActivityCard';
import Paper from '@mui/material/Paper';


function AllActivities() {
  const { filteredByAllCriteria } = useContext(ActivitiesContext)

  return (
    <>
      {/* <SortBar></SortBar> */}
      <div className="activities-page-container">
      <SearchBar></SearchBar>
        <Paper className="activities-list-container">
          {filteredByAllCriteria.map((activity) => (
            <ActivityCard key={activity.id} activity={activity}></ActivityCard>
          ))}
        </Paper>
      </div>
   </>
  );
}

export default AllActivities;
