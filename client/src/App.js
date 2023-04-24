import './index.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginHomeScreen from './pages/LoginHomeScreen.js'
import LoginNav from './components/LoginNav';
import LoginForm from './components/LoginForm';
import CreateAccount from './pages/CreateAccount.js'
import AllActivities from './pages/AllActivities.js'
import Interested from './pages/Interested.js'
import Visited from './pages/Visited.js'
import UserProfile from './pages/UserProfile';
import { UserContext } from './UserContext';

function App() {
 
    const [user, setUser] = useState(null);
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [interestedVariable, setInterestedVariable] = useState(null);
    const [interestedButtonText, setInterestedButtonText] = useState(null);


useEffect(() => {
    fetch("/me").then((res) => {
        if (res.ok) {
            res.json().then((user) => {
        if (user !== null) {
            setUser(user)
        }
        });
    }
    });
}, []);

useEffect(() => {
    fetch("/activities")
    .then(r => r.json())
    .then(activities => setActivities(activities))
}, [])

    useEffect(() => {
        if (selectedActivity) {
        const interested = selectedActivity.user_activities[0]?.interested;
        setInterestedVariable(interested);
        setInterestedButtonText(interested ? 'Remove from Interests' : 'Add to Interests');
    } else {
        setInterestedVariable(null);
        setInterestedButtonText(null);
    }
}, [selectedActivity]);


function interestedClick() {
    if (selectedActivity) {
        let isUserInterested = false 

        selectedActivity?.user_activities.forEach(item => {
            if (item.user_id == user.id) { 
                item.interested = !item.interested
                isUserInterested = item.interested
                console.log("isUserInterested from intClick: ", isUserInterested)
            } else {
                console.log("No. selectedActivity.user_activities doesn't exist")
            }
        })

    fetch('/user_activities', { // nothing changes here really
        method: 'POST',
        body: JSON.stringify({
        user_id: user.id,
        activity_id: selectedActivity.id,
        interested: isUserInterested, // accept this
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
    setSelectedActivity(selectedActivity)
    setActivities((prevActivities) => {
        const newActivities = prevActivities.map((activity) =>
        activity.id === selectedActivity.id ? selectedActivity : activity
        );
        return newActivities;
        });
    setInterestedButtonText(isUserInterested ? 'Remove from Interests' : 'Add to Interests');
        } else {
        console.log("interested no work not nice")
    }
    });
    }
    }

    return (
        <>
        <UserContext.Provider value={{ user, setUser }}>
            <LoginNav />
            <main>
                <Routes>
                    <Route path="/" element={<LoginHomeScreen />}></Route>
                    <Route path="/login" element={<LoginForm />}></Route>
                    <Route path="/logout" element={<LoginHomeScreen />}></Route>
                    <Route path="/create-account" element={<CreateAccount />}></Route>
                    <Route path="/user-profile" element={<UserProfile />}></Route>
                    <Route path="/activities" element={<AllActivities activities={activities} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} interestedClick={interestedClick} interestedButtonText={interestedButtonText} />}></Route>
                    <Route path="/interested" element={<Interested setSelectedActivity={setSelectedActivity} interestedClick={interestedClick} activities={activities} />} ></Route>
                    <Route path="/visited" element={<Visited />}></Route>
                </Routes>
            </main>
        </UserContext.Provider>
        </>
    );
}


export default App;