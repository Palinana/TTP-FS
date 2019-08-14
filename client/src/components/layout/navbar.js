import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import exit from '../../icons/exit.png';
import logo from '../../icons/logo.png';
import { logout } from '../../store';

class Navbar extends Component {
    render() {
        const { handleClick, isLoggedIn } = this.props;
        return (
            <nav className="navbar navbar-expand-md navbar-fixed mb-4">
                {isLoggedIn ? (
                    <div className="container-fluid">
                        <Link to="/portfolio" class="navbar-brand">
                            <img className="nav-logo" src={logo}/>
                        </Link>
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <Link to="/portfolio" className="nav-link">Portfolio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link" onClick={handleClick}>
                                    <img className="nav-exit" src={exit}/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    null
                )}
            </nav>
        )   
    }
}

const mapState = state => {
    return {
        isLoggedIn: !!state.user.id,
    }
}

const mapDispatch = dispatch => {
    return {
        handleClick() {
            dispatch(logout())
        }
    }
}
  
export default connect(mapState, mapDispatch)(Navbar);
  
Navbar.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
}

