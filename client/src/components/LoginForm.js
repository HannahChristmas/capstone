import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";

function LoginForm() {
    const { setUser } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        console.log("I clicked Login in LoginForm.js")
        setIsLoading(true);
        setErrors([]);
        fetch("/login", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
                console.log("user is logged in")
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
            setIsLoading(false);
        });
    }

    return (
        <>
        <div className="login-welcome-div">
            <h1>log in</h1>
        <form id="login-form" onSubmit={handleSubmit}>
            <label>
                Username: 
                <input 
                    htmlFor="username"
                    type="text" 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </label><br/>
            <label>
                Password: 
                <input 
                    htmlFor="password"
                    type="password" 
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </label><br/>
            <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
            <label>
                {errors.map((err) => (
                    <p key={err}>{err}</p>
                ))}
            </label>

        </form>
        </div>
        </>
    )
}

export default LoginForm; 