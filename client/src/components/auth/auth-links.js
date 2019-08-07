import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const AuthLinks = ({displayName}) => (
    <div className="auth__link-wrapper">
        {displayName === 'Login' ? (
            <p className="auth__link justify-content-center mt-3 font-weight-light">
                Not registered?
                <Link to="/signup" className="ml-1 font-weight-light">
                    Create an account
                </Link>
            </p>
          ) : (
            <p className="auth__link justify-content-center mt-3 font-weight-light">
                Have an account?
                <Link to="/login" className="ml-1 font-weight-light">
                    Login to your account
                </Link>
            </p>
        )}
    </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(AuthLinks);