import '../index.css';
import { useState, useContext, useRef } from 'react'
import { UserContext } from "../UserContext";


function CreateAccount() {
    const { setUser, selectedImage, setSelectedImage } = useContext(UserContext)
    const imageUpload = useRef()
 

    const [username, setUsername] = useState("");
    // const [selectedImage, setSelectedImage] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    function handleSubmit(e){
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', selectedImage)
        formData.append('username', username)
        formData.append('password', password)
        formData.append('password_confirmation', passwordConfirmation)
        console.log(formData)
        
        fetch("/signup", {
            method: "POST", 
            body: formData
        })
            .then((r) => {
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
            image:
            <input type="file"
              onChange={e => setSelectedImage(e.target.files[0])}
              ref={imageUpload}
              accept="image/png, image/jpeg"
            />
        </label>
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
