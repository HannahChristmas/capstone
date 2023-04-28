import { useState, useContext, useEffect, useRef } from 'react'
import {Link, NavLink} from 'react-router-dom'
import profile from '../profile.png'
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router";


function LoginNav() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    let menuRef = useRef();

    // useEffect(() => {
    //     document.addEventListener('mousedown', (event) => {
    //         if (menuRef.current && menuRef.current.contains(event.target)) {
    //             setIsMenuOpen(false);
    //         }
    //     });
    // }, [menuRef]);

    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if (!menuRef.current.contains(event.target)) {
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

    // console.log("from LoginNav.js:", user ? `Welcome, ${user.username}. You are logged in.` : "No user logged in")

    return (
    <>    
        <nav className="nav">
        <nav className="activity-nav">
            <ul>
                <li>
                    <NavLink to='/activities' className="login-nav">ALL ACTIVITIES</NavLink>
                </li>
                <li>
                    <NavLink to='/interested' className="login-nav">I'M INTERESTED</NavLink>
                </li>
                <li>
                    <NavLink to='/visited' className="login-nav">I'VE BEEN THERE</NavLink>
                </li>
            </ul>
        </nav>
            <Link to='/' className="site-title">CINCY SOCIAL</Link>
            <div ref={menuRef} id="avatar">
                {isMenuOpen ? (
                    <ul>
                        {user ? (
                            <>
                                <li><Link to='/user-profile'>view {user.username}</Link></li>
                                <li><Link to='/activities'>EDIT PROFILE</Link></li>
                                <li><Link 
                                    to='/logout' 
                                    className="login-nav"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogoutClick();
                                    }}
                                    >LOGOUT</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to='/login' className='login-nav'>LOGIN</Link></li>
                                <li><Link to='/create-account' className="login-nav">CREATE ACCOUNT</Link></li>
                            </>
                        )
                    }
                    </ul>
                ) : (
                    <img src={profile} onClick={toggleMenu} alt="default-profile"></img>
                )}
            </div>
        </nav>
    </>
    )
}

export default LoginNav;