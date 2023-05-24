import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../UserContext";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cincinnati from '../photos/Cincinnati.jpeg'


function LoginForm() {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate();
 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
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
                r.json().then((user) => {
                    setUser(user);
                    navigate("/activities");
                });
                console.log("user is logged in")
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
            setIsLoading(false);
        });
    }

    return (
        <>
        <div id="login-signup-container-div">
            <Paper id="login-signup-paper">
                <div id="login-signup-page-form">
                    <img src={Cincinnati} id="login-pic" alt="cincinnati skyline"></img>    
                    <form id="login-form" onSubmit={handleSubmit}>
                        <TextField
                        id="outlined-basic" 
                            label="username" 
                            variant="outlined"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{ width: '20rem' }}
                        /><br/><br></br>
                        <TextField
                        id="outlined-basic" 
                            label="password" 
                            variant="outlined"
                            autoComplete="current-password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ width: '20rem' }}
                        /><br/><br></br>
                        <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>
                        <label>
                            {errors.map((err) => (
                                <p key={err}>{err}</p>
                            ))}
                        </label>
                    </form>
                </div>
            </Paper>
        </div>
        </>
    )
}

export default LoginForm; 