import { useState } from "react";

function AllActivities({activities}) {

  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleViewClick = (activity) => {
    setSelectedActivity(activity);
  }

  const handleXClick = () => {
    setSelectedActivity(null);
  }

  return (
    <>
      <div>
        <h1>All activities</h1>
      </div>
      <div className="activities-page-container">
        <div className="activity-search-container"><h2>search</h2></div>
        <div className="activities-list-container">
          {activities.map((activity) => (
            <div key={activity.id} className="individual-activity">
              <h1>{activity.title}</h1>
              <h2>{activity.neighborhood}</h2>
              <h4>${activity.cost}</h4>
              <button onClick={() => handleViewClick(activity)}>Quick View</button>
            </div>          
          ))}
        </div>

      {selectedActivity && (
        <div className="popup-card">
          <h2>{selectedActivity.title}</h2>
          <button onClick={() => handleXClick(selectedActivity)}>X</button>
        </div>
      )}
      </div>
   </>
  );
}

export default AllActivities;
