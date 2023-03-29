
function LoginNav() {

    return (
        <nav className="nav">
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
    )
}

export default LoginNav;