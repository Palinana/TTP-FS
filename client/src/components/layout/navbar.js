import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../store';

const Navbar = ({ handleClick, isLoggedIn, userName }) => {
    if (!isLoggedIn) return null
    else {
        return (
            <nav className="navbar navbar-expand-md navbar-fixed mb-4">
                <div className="container">
                    {isLoggedIn ? <div className="navbar-greeting">Hi, <span className="navbar-user">{userName}</span></div> : null}
                    {isLoggedIn ? (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/portfolio" className="nav-link">Portfolio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link" onClick={handleClick}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                        ) : (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                                </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        )
    }    
}
  
const mapDispatch = dispatch => {
    return {
        handleClick() {
            dispatch(logout())
       }
    }
}
  
export default connect(null, mapDispatch)(Navbar);
  

Navbar.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}