import React, { useContext, useEffect } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';
import PopupCard from './PopupCard';
import Paper from '@mui/material/Paper';
import Cincinnati2 from '../photos/Cincinnati2.jpeg'

function ActivityCard({activity}) {
  const {  selectedActivity, setSelectedActivity } = useContext(ActivitiesContext)
  const showPopup = selectedActivity?.id === activity?.id;

  const handleViewClick = (activity) => {
    (activity.id === selectedActivity?.id ? setSelectedActivity(null) : setSelectedActivity(activity))
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPopup && !event.target.closest('.popup-card')) {
        setSelectedActivity(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPopup, setSelectedActivity]);

    return (
      <>
        <Paper key={activity.id} className="individual-activity">
          <img src={activity.image ? activity.image : Cincinnati2} id="activity-card-pic" alt="activity-pic"></img>
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

        {showPopup && (
          <>
            <div className="overlay">
              <PopupCard activity={activity}></PopupCard>
            </div>
          </>
        )}  
     </>
    );
  }
  
  export default ActivityCard;
  