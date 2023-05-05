import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../UserContext";

function EditProfile () {
    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [interests, setInterests] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [searchInterest, setSearchInterest] = useState('');
    const [filterCategory, setFilterCategory] = useState("Category")

    const filteredUserInterests = userInterests?.filter((interest) => 
      interest.user?.id === user?.id)

    const handleSearchChange = (e) => {
        setSearchInterest(e.target.value);
    };

    function handleCategoryFilter(e){
        setFilterCategory(e.target.value)
      } 

      function handleReset(){
        setFilterCategory("Category")
        setSearchInterest("")
      }

    const searchList = interests.filter(interest => {
        const { name, category } = interest;
        const lowerCaseQuery = searchInterest.toLowerCase();
        return (
          name.toLowerCase().includes(lowerCaseQuery) ||
          category.toLowerCase().includes(lowerCaseQuery)
        );
      });
    
    const filteredByAllCriteria = searchList.filter(interest => {
    if(filterCategory === "Category" || interest.category === filterCategory) {
            return true
        } else {
            return false
        }
        })


    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setBio(user.bio)
            // setUserInterests(user.interests)
        }
      }, [user])

    useEffect(() => {
      fetch("/interests")
      .then(r => r.json())
      .then(interests => {
        setInterests(interests)
      })
      }, [setInterests])

    useEffect(() => {
      fetch("/user_interests")
      .then(r => r.json())
      .then(interests => {
        setUserInterests(interests)
      })
      }, [setUserInterests])


    const handleInterestClick = (interestId) => {
      fetch("/user_interests", {
        method: 'POST',
        body: JSON.stringify({
          user_id: user.id,
          interest_id: interestId
        }), 
          headers: {
          'Content-Type': 'application/json'
          }
      })
        .then(r => r.json())
        .then(data => {
          setUserInterests([...userInterests, data])
        })        
    }

    // console.log("UI after post request: ", userInterests)

    const handleInterestDelete = (interestId) => {
      fetch(`/user_interests/${interestId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setUserInterests(userInterests.filter(interest => interest.id !== interestId));
        } else {
          throw new Error('Failed to delete interest');
        }
      })
      .catch(error => console.error(error));    
    }


    function handlePostUpdateSubmit(e) {
        e.preventDefault()
        // fetch request to current user
        fetch(`/me`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            bio
          }),
        })
        .then((r) => {
          setIsLoading(false);
          if (!r.ok) {
            r.json().then((err) => setErrors(err.errors))
          } else {
            r.json().then((updatedProfile) => setUser(updatedProfile));
            setErrors([])
          }
        })
      }



    if (!user) {
        return <p>Profile loading...</p>
    }
    
    return ( 
        <>
        <div id="main-profile-container">
          <div id="edit-profile-container">
            <h1>{user.username}</h1>
            <p>{user.bio}</p>
              <form onSubmit={handlePostUpdateSubmit} id="login-form">
                  <label>
                      username:
                      <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                      />
                  </label><br/>
                  <label>
                      bio: 
                      <input
                          type="text"
                          id="bio"
                          value={bio ? bio : "Enter bio here"}
                          onChange={(e) => setBio(e.target.value)}
                      />
                  </label><br/>
                  <button type="submit">{isLoading ? "Loading..." : "save changes"}</button><br/>
                  <label>
                      {errors.map((err) => (
                          <p key={err}>{err}</p>
                      ))}
                  </label>
              </form>
            </div>

            <div className="activity-search-container">
                <h4>Search Bar</h4>
                <div>
                <input type="text" value={searchInterest} onChange={handleSearchChange} />
                <br></br>
                <strong className="strong"> Filter By: </strong><br></br>
                <select className={"dropdown-filter"} onChange={handleCategoryFilter}>
                    <option value="Culture">Culture</option>
                    <option value="Festivals">Festivals</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Going Out">Going Out</option>
                    <option value="Hobbies">Hobbies</option>
                    <option value="Playing Sports">Playing Sports</option>
                    <option value="Sporting Events">Sporting Events</option>
                    <option value="Water Sports">Water Sports</option>

                </select><br></br>
                <button onClick={handleReset}>Reset</button>
                </div>
                
            </div>

            <div id="add-interests-container">
              <div id="heading-container">
              <h4>Select your interests:</h4>
              </div>
              {filteredByAllCriteria.map((interest) => {
                const isInterestSelected = filteredUserInterests.find((userInterest) => userInterest.interest_id === interest.id);
                if (isInterestSelected) {
                  return null;
                }
                return (
                  <div id="individual-interest-all" key={interest.id}>
                    <button onClick={() => handleInterestClick(interest.id)}>{interest.name}</button>
                  </div>
                );
              })}
            </div>
            <div id="your-interests-container">
              <div id="heading-container">
                <h4>Your interests:</h4>
              </div>
                <div>
                    {filteredUserInterests?.map((interest) => (
                    <div id="individual-interest-all" key={interest.id}>
                    <p>{interest.interest.name}</p><button id="delete-interest-button"onClick={() => handleInterestDelete(interest.id)}>X</button>
                    </div>
                    ))}
                </div>     
            </div>
          </div>
        </>
    )
}

export default EditProfile;