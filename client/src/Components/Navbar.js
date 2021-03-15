import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import Logo from '../images/musify.png';
import './Navbar.css';

const Navbar = props =>{
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavBar = ()=>{
        return (
            <>
                <Link to="/">
                    <h3 className="nav-item nav-link text-light">
                        Home
                    </h3>
                </Link>  
                <Link to="/login">
                    <h3 className="nav-item nav-link text-light">
                        Login
                    </h3>
                </Link>  
                <Link to="/register">
                    <h3 className="nav-item nav-link text-light">
                        Register
                    </h3>
                </Link>  
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>
                <Link to="/">
                    <h3 className="nav-item nav-link text-light">
                        Home
                    </h3>
                </Link> 
                <Link to="/profile">
                    <h3 className="nav-item nav-link text-light">
                        My Profile
                    </h3>
                </Link> 
                {
                    user.role === "admin" ? 
                    <Link to="/admin">
                        <h3 className="nav-item nav-link text-light">
                            Admin
                        </h3>
                    </Link> : null
                }  
                <button type="button" 
                        className="btn btn-link nav-item nav-link text-light" 
                        onClick={onClickLogoutHandler}>Logout</button>
            </>
        )
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light navSize">
            <Link to="/">
                <div className="navbar-brand musify-logo text-light"><img src={Logo} alt="Logo" />Musify</div>
            </Link>
            <div className="collapse navbar-collapse " id="navbarText">
                <ul className="navbar-nav mr-auto">
                    { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;