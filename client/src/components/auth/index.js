import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../store';
import AuthLinks from './auth-links';

const AuthForm = props => {
    const { name, displayName, handleSubmit, error } = props;
    return (
        <div className="auth d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmit} name={name} className="auth__form text-center">
                <h1 className="auth__form-title mb-5">{displayName}</h1>
                { displayName === 'Sign Up' ? 
                    <div className="form-group">
                        <input
                            type="name"
                            id="inputName"
                            name="name"
                            className="form-control form-control-lg font-weight-light"
                            placeholder="Name"
                            required
                            autoFocus
                        />
                    </div>
                    : null
                }

                <div className="form-group">
                    <input
                        type="email"
                        id="inputEmail"
                        name="email"
                        className="form-control form-control-lg font-weight-light"
                        placeholder="Email address"
                        required
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        className="form-control form-control-lg font-weight-light"
                        placeholder="Password"
                        required
                    />
                </div>

                {error && error.response && <div className="auth__form-error"> {error.response.data} </div>}
                <AuthLinks displayName={displayName} />

                <div>
                    <button type="submit" className="btn btn-lg btn-primary btn-block mt-5 font-weight-light">{displayName}</button>
                </div>
            </form>
        </div>
    )
}

const mapLogin = state => {
    return {
      name: 'login',
      displayName: 'Login',
      error: state.user.error
    }
}
  
const mapSignup = state => {
    return {
      name: 'signup',
      displayName: 'Sign Up',
      error: state.user.error
    }
}
  
const mapDispatch = dispatch => {
    return {
      handleSubmit(evt) {
        evt.preventDefault()
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, formName))
      }
    }
}
  
export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
  
AuthForm.propTypes = {
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.object
}