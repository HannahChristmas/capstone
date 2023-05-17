import { useState, useContext, useEffect, useRef } from 'react'
import {Link, NavLink} from 'react-router-dom'
import profile from '../profile.png'
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router";
import interestedNav from '../photos/Interested-nav.png'
import visitedNav from '../photos/Visited-nav.png'


function LoginNav() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    let menuRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if (menuRef && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        });
    });

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
                navigate("/activities");
            } 
        });
    }

    return (
    <>    
        <nav className="nav">
            <nav className="activity-nav">
                <ul>
                    <li>
                        <NavLink to='/activities' className="login-nav" id="all-nav-link">all</NavLink>
                    </li>
                    <li>
                        <NavLink to='/interested' className="login-nav">
                            <img src={interestedNav} className="custom-button" id="nav-button-interest" alt="nav-button"></img>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/visited' className="login-nav">
                            <img src={visitedNav} className="custom-button" id="nav-button-visit" alt="nav-button"></img>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Link to='/' className="site-title">cincy social</Link>
            <div ref={menuRef}>
                {isMenuOpen ? (
                    <ul>
                        {user ? (
                            <>
                                <li><Link to={`/users/${user.id}`}>view {user.username}</Link></li>
                                <li><Link to='/edit-profile'>edit profile</Link></li>
                                <li><Link 
                                    to='/logout' 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogoutClick();
                                    }}
                                    >logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to='/login'>LOGIN</Link></li>
                                <li><Link to='/create-account'>CREATE ACCOUNT</Link></li>
                            </>
                        )
                    }
                    </ul>
                ) : (
                    <img src={user && user.image ? user.image : profile} onClick={toggleMenu} id="user-nav-pic" alt="default-profile"></img>
                )}
            </div>
        </nav>
    </>
    )
}

export default LoginNav;