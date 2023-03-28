
function ActivityNav() {
    return (
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
    )
}

export default ActivityNav;