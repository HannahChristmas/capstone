import { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import profile from '../profile.png'
import { UserContext } from "../UserContext";


function LoginNav() {
    const { user, setUser } = useContext(UserContext)

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            } 
        });
    }

    console.log(user ? `Welcome, ${user.username}. You are logged in.` : "No user logged in")

    return (
        <>    
        <nav className="nav">
        <Link to='/' className="site-title">CINCY SOCIAL</Link>
        {isMenuOpen ? (
            <ul>
                <li>
                    {user ? (
                        <button onClick={handleLogoutClick}>
                        <Link to='/logout' className="login-nav">LOGOUT</Link>
                        </button>
                    ) : (
                        <Link to='/login' className='login-nav'>LOGIN</Link>
                    )}
                </li>
                <li>
                    <Link to='/create-account' className="login-nav">CREATE ACCOUNT</Link>
                </li>
                <li onClick={toggleMenu}>x</li>
            </ul>
        ) : (
            <img src={profile} onClick={toggleMenu} alt="default-profile"></img>
        )}
      </nav>
<nav className="activity-nav">
        <h1>Welcome, !</h1>
        {/* <h1>Welcome, {user.username}!</h1> */}

<ul>
    <li>
        <Link to='/activities' className="login-nav">ALL ACTIVITIES</Link>

        {/* <a href="/activities" className="login-nav">ALL ACTIVITIES</a> */}
    </li>
    <li>
        <Link to='/interested' className="login-nav">I'M INTERESTED</Link>

        {/* <a href="/interested" className="login-nav">I'M INTERESTED</a> */}
    </li>
    <li>
        <Link to='/visited' className="login-nav">I'VE BEEN THERE</Link>

        {/* <a href="/visited" className="login-nav">I'VE BEEN THERE</a> */}
    </li>
</ul>


{/* <h1 id="login-logo-cincy-social">CINCY SOCIAL</h1> */}
  {/* <div>
    <h3 id="login-nav" onClick={loginClick}>LOGIN</h3>
    <h3 id="login-nav">CREATE ACCOUNT</h3>
  </div> */}
</nav>
</>
    )
}

export default LoginNav;