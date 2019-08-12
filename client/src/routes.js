import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Login, Signup } from './components/auth';
import Portfolio from './components/portfolio';
import Navbar from './components/layout/navbar';

import { me } from './store';

class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        const { isLoggedIn } = this.props;
        return (
            <div>
                <Navbar {...this.props}/>
                <Switch>
                    <Redirect exact from="/" to="/login" />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    
                    { isLoggedIn && (
                        <Switch>
                            <Route
                                exact path="/portfolio"
                                render={() => <Portfolio {...this.props} />}
                            />
                        </Switch>
                    )}
                </Switch>
            </div>
        );
    }
}

const mapState = state => {
    return {
        isLoggedIn: !!state.user.id,
        userId: state.user.id,
        userName: state.user.name 
    };
};

const mapDispatch = dispatch => {
    return {
        loadInitialData() {
            dispatch(me());
        },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
