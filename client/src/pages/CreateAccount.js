import '../index.css';
import { useState, useContext } from 'react'
import { UserContext } from "../UserContext";


function CreateAccount() {
    const { setUser } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    function handleSubmit(e){
        e.preventDefault();
        console.log("I CLICKED IT!")
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                username, 
                password,
                password_confirmation: passwordConfirmation
            }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => setUser(user));
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        });
    }

  return (
    <>
   <div className="login-welcome-div">

    <h1>create an account</h1>
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
            password:
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </label><br/>
        <label>
            password confirmation: 
            <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
        </label><br/>
        <button type="submit">{isLoading ? "Loading..." : "sign up"}</button>
        <label>
            {errors.map((err) => (
                <p key={err}>{err}</p>
            ))}
        </label>
    </form>
   </div>
   <div id="login-footer">
    {/* <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/> */}
   </div>
   </>
  );
}

export default CreateAccount;
