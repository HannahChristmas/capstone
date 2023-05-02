import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { ActivitiesContext } from '../ActivitiesContext';

function PopupCard({activity}) {
    const { userInterested, userVisited } = useContext(UserContext)
    const { showInterestedUsers, selectedActivity, setSelectedActivity, setShowInterestedUsers, interestedClick, visitedClick, handleViewClick, handleXClick, displayInterestedUsers } = useContext(ActivitiesContext)


    return (
        <>
        <div className="popup-card">
            <h1>popupCard</h1>
            <p>{activity.title}</p>
            <p>{activity.neighborhood}</p>
            <button onClick={() => interestedClick(selectedActivity)}>{userInterested ? "❤️" : "♡"}</button><br/>
            <button onClick={() => visitedClick(selectedActivity)}>{userVisited ? "YAYA" : "Nono"}</button><br/><br/><br/>
            <button>reviews</button><br/>
            <button onClick={displayInterestedUsers}>who's interested</button><br/>
            {showInterestedUsers && selectedActivity.users.map((userActivity => 
                <h1 key={userActivity.id}>{userActivity.username}</h1>))}
                <button onClick={() => handleXClick(selectedActivity)}>X</button>
        </div>
        </>
    )
}

export default PopupCard;

