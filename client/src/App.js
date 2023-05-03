import './index.css';
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginHomeScreen from './pages/LoginHomeScreen.js';
import LoginNav from './components/LoginNav';
import LoginForm from './components/LoginForm';
import CreateAccount from './pages/CreateAccount.js';
import AllActivities from './pages/AllActivities.js';
import Interested from './pages/Interested.js';
import Visited from './pages/Visited.js';
import UserProfile from './pages/UserProfile';
import { UserContext } from './UserContext'; 
import { ActivitiesContext } from './ActivitiesContext'; 

function App() {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNeighborhood, setFilterNeighborhood] = useState("Neighborhood")
  const [filterCost, setFilterCost] = useState("Cost")

  const location = useLocation();

  useEffect(() => {
    setSelectedActivity(null); // set state to null every time the location changes
    setSearchQuery('')
    setFilterCost('Cost')
    setFilterNeighborhood('Neighborhood');
  }, [location]);

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
      .then(activities => {
        const sortedActivities = activities.sort((a, b) => a.title.localeCompare(b.title))
        setActivities(sortedActivities)
      })
  }, [setActivities])
// DO I NEED SETSELECTEDACTIVITY IN THE DEPENDENCY ARRAY?!?!?

  const sortByName = () => {
    const sortedActivities = [...activities].sort((a, b) => {
      const nameA = a.title.toUpperCase(); 
      const nameB = b.title.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setActivities(sortedActivities);
  }

  const sortByCost = () => {
    setActivities([...activities].sort((a, b) => a.cost - b.cost));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
};

  const searchList = activities.filter(activity => {
    const { title, neighborhood, website } = activity;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      title.toLowerCase().includes(lowerCaseQuery) ||
      neighborhood.toLowerCase().includes(lowerCaseQuery) ||
      website.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const filteredByAllCriteria = searchList.filter(activity => {
    if((filterNeighborhood === "Neighborhood" || activity.neighborhood === filterNeighborhood) 
    && (filterCost === "Cost" || activity.cost === filterCost)) { 
      return true
      }
      return false;
      })

    return (
        <>
        <UserContext.Provider value={{ user, setUser }}>
        <ActivitiesContext.Provider value={{
          activities,
          filteredByAllCriteria,
          handleSearchChange,
          searchQuery,
          setSearchQuery,
          setFilterNeighborhood,
          setFilterCost,
          setActivities,
          selectedActivity,
          setSelectedActivity,
          sortByName,
          sortByCost,
         }}>
            <LoginNav />
            <main>
                <Routes>
                    <Route path="/" element={<LoginHomeScreen />}></Route>
                    <Route path="/login" element={<LoginForm />}></Route>
                    <Route path="/logout" element={<LoginHomeScreen />}></Route>
                    <Route path="/create-account" element={<CreateAccount />}></Route>
                    <Route path="/user-profile" element={<UserProfile />}></Route>
                    <Route path="/activities" element={<AllActivities/>}></Route>
                    <Route path="/interested" element={<Interested/>} ></Route>
                    <Route path="/visited" element={<Visited/>}></Route>
                </Routes>
            </main>
          </ActivitiesContext.Provider>
        </UserContext.Provider>
        </>
    );
}

export default App;