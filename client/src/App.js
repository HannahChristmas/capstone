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
    // const [interestedVariable, setInterestedVariable] = useState(null);
    // const [interestedButtonText, setInterestedButtonText] = useState(null);

    // const initialUserInterest = (selectedActivity?.user_activities[0]?.interested ? selectedActivity.user_activities[0].interested : false)
    // console.log("initialUserInterest Initial State: ", initialUserInterest)

    // const [userInterested, setUserInterested] = useState(initialUserInterest)
    // const [interestButton, setInterestButton] = useState(initialUserInterest.toString())


    // console.log("User Interested at top of page: ", userInterested)


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

function interestedClick() {
  if(selectedActivity.user_activities?.length > 0) {
    // setUserInterested(userInterested => !userInterested)
    // console.log("UI after click", userInterested)
    // first post request 
    console.log("1) selectedActivity from IC:", selectedActivity)
    fetch(`/user_activities/${selectedActivity.id}`, { 
      method: 'PATCH',
      body: JSON.stringify({
      user_id: user.id,
      activity_id: selectedActivity.id,
      interested: false, 
      }),
      headers: {
      'Content-Type': 'application/json'
      }
  })
  // .then(console.log("selectedActivityfromClick", selectedActivity))
  .then(r => r.json())
  // .then(setUserInterested(!userInterested))

  .then(data => {
    console.log("3) NOT? should be false from patch", selectedActivity)
    console.log("2) DATA", data)
    // selectedActivity.user_activities.push(data)
    const interestData = {
      id: data.id,
      interest: data.interested
    }

    console.log("interestData", interestData)

    const updatedUserActivity = selectedActivity.user_activities.map((activity) => activity.id === interestData.id ? interestData : activity)
    // const updatedReviews = foundMovie.movies_with_reviews.map((review) => review.review_id === individualReview.review_id ? individualReview : review)
    selectedActivity.user_activities = updatedUserActivity

    const updatedActivities = activities.map((activity) => {
      if (selectedActivity.id === activity.id) {
        return selectedActivity
      } else {
        return activity
      }
    // console.log("PATCH data- a whole ass userActivity: ", data)
  })
  setActivities(updatedActivities)
  console.log("4) updateAll from PATCH: ", updatedActivities)

  })
  // console.log("updateAll from PATCH: ", updatedActivities)

  } else {
    fetch('/user_activities', { 
      method: 'POST',
      body: JSON.stringify({
      user_id: user.id,
      activity_id: selectedActivity.id,
      interested: true, // except this
      }),
      headers: {
      'Content-Type': 'application/json'
      }
  }).then(r => r.json())
  .then(data => {
    // setUserInterested(true)
    // console.log("UI inside POST", userInterested)
    // setInterestButton(userInterested.toString())

    selectedActivity.user_activities.push(data)
    console.log("1) posty post", selectedActivity)
    const updatedActivities = activities.map((activity) => {
      if (selectedActivity.id === activity.id) {
        return selectedActivity
      } else {
        return activity
      }
    })
    // setUserInterested(true)
    // don't be fancy just be explicit
    // setInterestButton("YA WOOOOO!")
    // console.log("UI inside POST", userInterested)
    setActivities(updatedActivities)
    console.log("2) POST please kill me and let this work: ", updatedActivities)
  })
  // .then(console.log("posty post", selectedActivity))
  // setAllActivities to include this new bitch
  // const updatedActivities = activities.map((activity) => {
  //   if (selectedActivity.id === activity.id) {
  //     return selectedActivity
  //   } else {
  //     return activity
  //   }
  // })
  // setActivities(updatedActivities)
  // console.log("POST please kill me and let this work: ", updatedActivities)
  }
}

// console.log("outside of whole ass function: ", userInterested)




// This effect will only run when the selectedActivity changes.

// useEffect(() => {
//     if (selectedActivity) {
//       const interested = selectedActivity.user_activities[0]?.interested;
//         setInterestedVariable(interested);
//         setInterestedButtonText(interested ? 'Remove from Interests' : 'Add to Interests');
//     } else {
//         setInterestedVariable(null);
//         setInterestedButtonText(null);
//     }
// }, [selectedActivity]);

// function interestedClick() {
//     if (selectedActivity) {
//       // 
//         let isUserInterested = false
        
//         console.log('selectedActivty from IntClick: ', selectedActivity)
//         console.log(isUserInterested)


//         selectedActivity?.user_activities.forEach(item => {
//             if (item.user_id === user.id) { 
//                 item.interested = !item.interested
//                 isUserInterested = item.interested
//                 console.log("isUserInterested from intClick: ", isUserInterested)
//             } else {
//                 console.log("No. selectedActivity.user_activities doesn't exist")
//             }
//         })

    // fetch('/user_activities', { // nothing changes here really
    //     method: 'POST',
    //     body: JSON.stringify({
    //     user_id: user.id,
    //     activity_id: selectedActivity.id,
    //     interested: isUserInterested, // except this
    //     }),
    //     headers: {
    //     'Content-Type': 'application/json'
    //     }
    // }).then(response => {
//         if (response.ok) {
//     setSelectedActivity(selectedActivity)
//     setActivities((prevActivities) => {
//         const newActivities = prevActivities.map((activity) =>
//         activity.id === selectedActivity.id ? selectedActivity : activity
//         );
//         return newActivities;
//         });
//     setInterestedButtonText(isUserInterested ? 'Remove from Interests' : 'Add to Interests');
//         } else {
//         console.log("interested no work not nice")
//     }
//     });
//     }
//     }

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
                    <Route path="/activities" element={<AllActivities activities={activities} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} interestedClick={interestedClick}  />}></Route>
                    <Route path="/interested" element={<Interested setSelectedActivity={setSelectedActivity} interestedClick={interestedClick} activities={activities} />} ></Route>
                    <Route path="/visited" element={<Visited />}></Route>
                </Routes>
            </main>
        </UserContext.Provider>
        </>
    );
}


export default App;