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
                    <img src={user && user.image ? user.image : profile} onClick={toggleMenu} alt="default-profile"></img>
                )}
            </div>
        </nav>
    </>
    )
}

export default LoginNav;