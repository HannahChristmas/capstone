import '../index.css';
import LoginNav from '../components/LoginNav';

function LoginScreen() {

  return (
    <>
    {/* <LoginNav></LoginNav> */}

   <div className="login-welcome-div">

    <h1>create an account</h1>
    <form id="login-form">
        <label>
            username:
            <input
                type="text"
                id="username"
            />
        </label><br></br>
        <label>
            email:
            <input
                type="text"
                id="password"
            />
        </label><br></br>
        <label>
            password: 
            <input
                type="text"
                id="username"
            />
        </label><br></br>
        <label>
            confirm password: 
            <input
                type="text"
                id="username"
            />
        </label><br></br>
        <button>save changes</button>
    </form>
   </div>
   <div id="login-footer">
    <img id="footer-image" src="https://i.ibb.co/qFPpqCQ/skyline3.png" alt="skyline"/>
   </div>
   </>
  );
}

export default LoginScreen;
