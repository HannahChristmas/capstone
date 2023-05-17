import React, { useContext } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';
import PopupCard from './PopupCard';
import Paper from '@mui/material/Paper';


function ActivityCard({activity}) {
  const {  selectedActivity, setSelectedActivity } = useContext(ActivitiesContext)

  const handleViewClick = (activity) => {
    (activity?.id === selectedActivity?.id ? setSelectedActivity(null) : setSelectedActivity(activity))
  }

    return (
      <>
        <Paper key={activity.id} className="individual-activity">
          <img src={activity.image} id="activity-card-pic" alt="activity-pic"></img>
          <h1>{activity.title}</h1>
          <h2 style={{ fontWeight: 'bold' }}>{activity.neighborhood} · ${activity.cost}</h2>
          <p>
          {activity.category.map((category, index) => (
            <span key={category}>
              {category}
              {index !== activity.category.length - 1 && ", "}
            </span>
          ))}
          </p>
          <button id='quick-view-button' className='custom-button' onClick={() => handleViewClick(activity)}>I</button>
        </Paper>  

        {selectedActivity?.id === activity?.id && (
          <PopupCard activity={activity}></PopupCard>
        )}  
     </>
    );
  }
  
  export default ActivityCard;
  