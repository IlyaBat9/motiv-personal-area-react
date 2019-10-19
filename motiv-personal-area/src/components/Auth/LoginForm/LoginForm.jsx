import React, { Component } from "react";
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import {loginUser} from '../../../Store/Actions/AuthActions'


class LoginForm extends Component {
    state = {
        phone: "",
        password: "",
        rememberMe: false
    };

    translateError(errorText) {
        if (errorText === "user not found") {
            return "пользователя не существует";
        }
        else if (errorText === "invalid password") {
            return "неверный пароль";
        }
    }

    composeUser() {
        return {
            "login": this.state.phone,
            "password": this.state.password,
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.loginUser(this.composeUser(), this.state.rememberMe);
    };

    handleChange = event => {
        if(event.target.name === "authLoginField") {
            this.setState({
                phone: event.target.value
            });
        }
        else if (event.target.name === "authPasswordField") {
            this.setState({
                password: event.target.value
            });
        }
        else if (event.target.name === "rememberMe") {
            this.setState({
                rememberMe: !this.state.rememberMe
            })
        }
    };

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Вход</h2>
                        <InputMask {...this.props}
                               mask="+7 (999) 999-99-99"
                               maskChar=" "
                               type="text"
                               name="authLoginField"
                               placeholder="телефон"
                               value={this.state.phone}
                               onChange={this.handleChange}
                        />
                        <input className="col-md-10 offset-md-1 bordered-input"
                               type="password"
                               name="authPasswordField"
                               autoComplete="currentPassword"
                               placeholder="пароль"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />
                        <label className="checkbox-label col-md-8 offset-md-1" htmlFor="rememberMe">
                            <input className="checkbox"
                                   type="checkbox"
                                   name="rememberMe"
                                   id="rememberMe"
                                   onChange={this.handleChange}
                                   value={this.state.rememberMe}
                            /><p>запомнить меня</p></label>
                        <p>{JSON.stringify(this.state.response)}</p>
                        <div>{this.translateError(this.props.errorText)}</div>
                        <input type='submit' value="Отправить" />
                    </form>
                </div>
            </div>
        );
    }
}

const MapStateToProps = (store) => {
    return {
        token: store.AuthReducer.token,
    };
};

const MapDispatchToProps = dispatch => ({
    loginUser: (userData, rememberMe) => dispatch(loginUser(userData, rememberMe))
});

export default connect(MapStateToProps, MapDispatchToProps)(LoginForm);