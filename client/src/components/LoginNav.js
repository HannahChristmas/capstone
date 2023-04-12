import {useState} from 'react'
import {Link} from 'react-router-dom'
import profile from '../profile.png'

function LoginNav() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    console.log(isMenuOpen ? 'Open' : 'Closed');

    return (
        <>    
        <nav className="nav">
        <Link to='/' className="site-title">CINCY SOCIAL</Link>
        <ul>
            {/* <li>
                <Link to='/login' className="login-nav">LOGIN</Link>
            </li>
            <li>
                <Link to='/create-account' className="login-nav">CREATE ACCOUNT</Link>
            </li>
            <li>
                <Link to='/logged-in' className="login-nav">LOGGED IN</Link>
            </li> */}
        </ul>
        {isMenuOpen ? (
            <ul>
                <li>
                    <Link to='/login' className="login-nav">LOGIN</Link>
                </li>
                <li>
                    <Link to='/create-account' className="login-nav">CREATE ACCOUNT</Link>
                </li>
                <li onClick={toggleMenu}>x</li>
            </ul>
        ) : (
            <img src={profile} onClick={toggleMenu}></img>
        )}
      </nav>

<nav className="activity-nav">
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