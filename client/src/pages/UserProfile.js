import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../UserContext";

function UserProfile () {
    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [interests, setInterests] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    const heLikes = user?.user_interests?.map((item) => {
      return (
        // interest.id
        item.interest?.name
      )
    })

    console.log("heLikes:", heLikes)

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setBio(user.bio)
        }
      }, [user])

    useEffect(() => {
      fetch("/interests")
      .then(r => r.json())
      .then(interests => {
        setInterests(interests)
      })
      }, [setInterests])

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
          console.log(data)
          setSelectedInterests([...selectedInterests, data])
          console.log("SI Before:", selectedInterests)
        })
        console.log("SI After: ", selectedInterests)
        
    }
    console.log("SI After after: ", selectedInterests)


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
                  <div key={interest.id} onClick={() => handleInterestClick(interest.id)}>
                  <p>{interest.name}</p>
                  </div>
                ))}
              <h2>Your selected interests:</h2>
                {selectedInterests.map(interest => (
                <p key={interest.id}>{interest.name}</p>
                ))}
            </div>
        </>
    )
}

export default UserProfile;