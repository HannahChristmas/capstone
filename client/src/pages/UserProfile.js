import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../UserContext";

function UserProfile () {
    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [interests, setInterests] = useState([]);
    const [userInterests, setUserInterests] = useState([]);

    const filteredUserInterests = userInterests?.filter((interest) => 
      interest.user?.id === user?.id)

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
          <h1>{user.username}</h1>
          <p>{user.bio}</p>
          <p>{user.id}</p>
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
            <div>
              <h1>Select your interests:</h1>
                {interests.map(interest => (
                  <div key={interest.id} >
                  <p>{interest.name}</p><button onClick={() => handleInterestClick(interest.id)}>yep</button>
                  </div>
                ))}
              <h2>Your interests:</h2>
                <div>
                   {filteredUserInterests?.map((interest) => (
                    <div key={interest.id}>
                    <p>{interest.interest.name} - {interest.id}</p><button onClick={() => handleInterestDelete(interest.id)}>X</button>
                    </div>
                   ))}
                </div>      
            </div>
        </>
    )
}

export default UserProfile;