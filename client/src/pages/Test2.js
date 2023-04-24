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
        let isUserInterested = false // we want to assume this starts false.. if an activity is found we can overwrite it

        selectedActivity.user_activities.forEach(item => {
            if (item.user_id == user.id) { // find if the user_activity exists for current user and if so get the value from there
                item.interested = !item.interested
                isUserInterested = item.interested
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
        /*
            okay here is the real issue... I know the answer so don't spend more than two hours on this.. 
            If we look at the accepted activity and it has a previous user_activity it all works great. but if the for loop doesn't find something, the isUserInterested is hard set to false... we need to make that loop get_or_add user interested so that new activities will have the new user_activity
          */
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