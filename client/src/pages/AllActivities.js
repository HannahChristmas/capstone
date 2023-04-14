import { useState } from "react";

function AllActivities({activities}) {

  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleViewClick = (activity) => {
    setSelectedActivity(activity);
  }

  const handleXClick = (activity) => {
    setSelectedActivity(null);
  }

  return (
    <>
      <div className="all-activities">
        <h1>All activities</h1>
        {activities.map((activity) => (
          <div key={activity.id}>
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
   </>
  );
}

export default AllActivities;
