
function LoginNav() {

    return (
        <>    <nav className="nav">
        <a href="/" className="site-title">CINCY SOCIAL</a>
        <ul>
            <li>
                <a href="/login" className="login-nav">LOGIN</a>
            </li>
            <li>
                <a href="/create-account" className="login-nav">CREATE ACCOUNT</a>
            </li>
            <li>
                <a href="/logged-in" className="login-nav">LOGGED IN</a>
            </li>
        </ul>
      </nav>

<nav className="activity-nav">
<ul>
    <li>
        <a href="/activities" className="login-nav">ALL ACTIVITIES</a>
    </li>
    <li>
        <a href="/interested" className="login-nav">I'M INTERESTED</a>
    </li>
    <li>
        <a href="/visited" className="login-nav">I'VE BEEN THERE</a>
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