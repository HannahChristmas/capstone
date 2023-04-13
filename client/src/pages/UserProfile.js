import { useContext, useState } from 'react'
import { UserContext } from "../UserContext";

function UserProfile () {
    const { user } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            password,
            password_confirmation: passwordConfirmation,
            bio
          }),
        })
          .then((r) => r.json())
          .then((updatedProfile) => {
            // handleUpdatePost(updatedProfile)
            console.log("I clicked update button UserProfile.js")
          })
        //   .then(() => setIsEditing(false))
      }

    if (!user) {
        return <p>Profile loading...</p>
    }
    return (
        <>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
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
                    new password:
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label><br/>
                <label>
                    confirm password: 
                    <input
                        type="password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                <button type="submit">{isLoading ? "Loading..." : "delete profile"}</button>
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