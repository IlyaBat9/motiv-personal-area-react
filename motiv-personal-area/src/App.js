import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Account from "./components/Account/Account";
import Auth from "./components/Auth/Auth"
import {fetchUserOnToken, loginUser, validateToken} from "./Store/Actions/AuthActions";
import {connect} from "react-redux";

class App extends Component {

    componentDidMount() {
        this.props.validateToken()
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/" exact component={Account}/>
                    <Route path="/auth" component={Auth}/>
                </Switch>
            </React.Fragment>
        );
    }
}

const MapStateToProps = (store) => {
    return {
        token: store.AuthReducer.token,
        errorText: store.AuthReducer.loginError
    };
};

const MapDispatchToProps = dispatch => ({
    validateToken: () => dispatch(validateToken())
});

export default connect(MapStateToProps, MapDispatchToProps)(App);