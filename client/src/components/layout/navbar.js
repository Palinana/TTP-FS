import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import exit from '../../icons/exit.png';
import logo from '../../icons/logo.png';
import { logout } from '../../store';

class Navbar extends Component {
    state = {
        navCollapsed: true
    }
    
    onToggleNav = () => {
        this.setState({ navCollapsed: !this.state.navCollapsed })
    }
      
    render() {
        const { handleClick, isLoggedIn } = this.props;
        const { navCollapsed } = this.state;

        if (isLoggedIn) {
            return (
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link to="/portfolio" className="navbar-brand">
                        <img className="nav-logo" alt="Stock app logo icon" src={logo}/>
                    </Link>

                    <button className="navbar-toggler" onClick={this.onToggleNav} type="button" data-toggle="collapse" >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse justify-content-end'}>
                        <ul className="navbar-nav text-right">
                            <li className="nav-item">
                                <Link to="/portfolio" className="nav-link">Portfolio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/transactions" className="nav-link">Transactions</Link>
                            </li>
                            <Link to="#" className="nav-link" onClick={handleClick}>
                                <img className="nav-exit" alt="Stock app exit icon" src={exit}/>
                            </Link>
                        </ul>
                    </div>    
                </nav> 
            ) 
        }
        else return null
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
