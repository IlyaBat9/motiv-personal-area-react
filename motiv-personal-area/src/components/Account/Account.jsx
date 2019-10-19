import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

function Account(props) {
    if(!props.token){
        return <Redirect to={"/auth"}/>
    }
    return (
        <React.Fragment>
            <h1>Account</h1>
        </React.Fragment>
    );
}

function MapStateToProps(store) {
    return {
        token: store.AuthReducer.token
    }
}

export default connect(MapStateToProps, null)(Account);