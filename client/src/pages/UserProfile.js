import { useContext, useState } from 'react'
import { UserContext } from "../UserContext";

function UserProfile () {
    const { user } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        console.log("Edit profile form clicked UserProfile.js")
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
            <form onSubmit={handleSubmit} id="login-form">
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
                    avatar url: 
                    <input
                        type="password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
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