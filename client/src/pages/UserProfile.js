import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../UserContext";

function UserProfile () {
    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setBio(user.bio)
        }
      }, [user])

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
          // .then((r) => r.json())
          // .then((updatedProfile) => {
          //   setUser(updatedProfile)
          // })
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
                        value={bio}
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
        </>
    )
}

export default UserProfile;