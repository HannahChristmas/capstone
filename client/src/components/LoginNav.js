import {Link} from 'react-router-dom'

function LoginNav() {

    return (
        <>    
        <nav className="nav">
        <Link to='/' className="site-title">CINCY SOCIAL</Link>

        {/* <a href="/" className="site-title">CINCY SOCIAL</a> */}
        <ul>
            <li>
                <Link to='/login' className="login-nav">LOGIN</Link>
                {/* <a href="/login" className="login-nav">LOGIN</a> */}
            </li>
            <li>
                <Link to='/create-account' className="login-nav">CREATE ACCOUNT</Link>
                {/* <a href="/create-account" className="login-nav">CREATE ACCOUNT</a> */}
            </li>
            <li>
                <Link to='/logged-in' className="login-nav">LOGGED IN</Link>
                {/* <a href="/logged-in" className="login-nav">LOGGED IN</a> */}
            </li>
        </ul>
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