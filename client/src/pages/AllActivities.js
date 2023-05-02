
import React, { useContext } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';
import SearchBar from '../components/SearchBar';
import SortBar from '../components/SortBar';
import ActivityCard from './ActivityCard';

function AllActivities() {
  const { activities } = useContext(ActivitiesContext)

  return (
    <>
      <SortBar></SortBar>
      <div className="activities-page-container">
      <SearchBar></SearchBar>
        <div className="activities-list-container">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity}></ActivityCard>
          ))}
        </div>
      </div>
   </>
  );
}

export default AllActivities;
