import '../index.css';
import { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Cincinnati2 from '../photos/Cincinnati2.jpeg'


function CreateAccount() {
    const { setUser, selectedImage, setSelectedImage } = useContext(UserContext)
    const [previewImage, setPreviewImage] = useState(Cincinnati2);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const imageUpload = useRef()
    const navigate = useNavigate(); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
      
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);
          setSelectedImage(file);
        } else {
          setPreviewImage(Cincinnati2);
          setSelectedImage(null);
        }
      };
      
    function handleSubmit(e){
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('username', username)
        formData.append('password', password)
        formData.append('password_confirmation', passwordConfirmation)
        console.log(formData)

        if (selectedImage) {
            formData.append('image', selectedImage);
          }
        
        fetch("/signup", {
            method: "POST", 
            body: formData
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                    navigate("/activities");
                } else {
                    r.json().then((err) => setErrors(err.errors))
                }
            });
    }

  return (
    <>
   <div id="login-signup-container-div">
    <Paper id="login-signup-paper">
        <div id="login-signup-page-form">
            <img src={previewImage} id="signup-pic" alt="default-profile"></img>    
            <form onSubmit={handleSubmit} id="login-form">
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
                    type="password"
                    variant="outlined"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: '20rem' }}
                /><br/><br></br>
                <TextField
                id="outlined-basic" 
                    label="password confirmation"
                    type="password" 
                    variant="outlined"
                    value={passwordConfirmation} 
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    sx={{ width: '20rem' }}
                /><br/><br></br>
                <Input
                    type="file"
                    onChange={handleImageChange}
                    ref={imageUpload}
                    accept="image/png, image/jpeg"
                    sx={{ width: '20rem' }}
                    /><br></br><br></br>    
                <Button type="submit">{isLoading ? "Loading..." : "sign up"}</Button>
                <label>
                    {errors?.map((err) => (
                        <p key={err}>{err}</p>
                    ))}
                </label>
            </form>
        </div>
    </Paper>
   </div>
   <div id="login-footer">
    {/* <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/> */}
   </div>
   </>
  );
}

export default CreateAccount;
