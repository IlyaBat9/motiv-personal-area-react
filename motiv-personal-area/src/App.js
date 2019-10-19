import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Account from "./components/Account/Account";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header/Header";

function App() {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path="/" exact component = {Account}/>
                <Route path="/auth" component = {Auth}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;