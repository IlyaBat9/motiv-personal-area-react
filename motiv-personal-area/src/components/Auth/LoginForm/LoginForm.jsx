import React, { Component } from "react";
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import {loginUser, loginUserOtp, logoutUser, setLoginError} from '../../../Store/Actions/AuthActions'


class LoginForm extends Component {
    state = {
        phone: "",
        password: "",
        otp: "",
        rememberMe: false,
        mode: "password",
    };

    composeUser(mode) {

        function processPhone(phone) {
            let result = "";
            for(let i = 0; i < phone.length; ++i)
                if(phone[i] >= '0' && phone[i] <= '9')
                    result+=phone[i];
            return result
        }

        if(mode === "password") {
            return {
                "login": processPhone(this.state.phone),
                "password": this.state.password,
            }
        }
        else if(mode === "otp"){
            return {
                "login": processPhone(this.state.phone),
                "otp": this.state.otp,
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        function preValidation(phone, password) {
            function checkEmptyFields() {
                return phone && password
            }
            if(!checkEmptyFields()) {
                return "Пожалуйста заполните все поля"
            }
            else{
                return "ok"
            }
        }

        const mode = this.state.mode
        if(mode === "password") {
            if (preValidation(this.state.phone, this.state.password) === "ok") {
                this.props.loginUser(this.composeUser("password"), this.state.rememberMe);
            } else {
                this.props.setLoginError("Пожалуйста заполните все поля")
            }
        }
        else if(mode === "otp") {
            if (preValidation(this.state.phone, this.state.otp) === "ok") {
                this.props.loginUserOtp(this.composeUser(mode), this.state.rememberMe);
            } else {
                this.props.setLoginError("Пожалуйста заполните все поля")
            }
        }
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
        else if (event.target.name === "authPasswordFieldOtp") {
            this.setState({
                otp: event.target.value
            });
        }
        else if (event.target.name === "rememberMe") {
            this.setState({
                rememberMe: !this.state.rememberMe
            })
        }
    };

    render() {
        var authField;
        var switchButton;
        if(this.state.mode === 'password'){
            authField = (<input
                               type="password"
                               name="authPasswordField"
                               autoComplete="currentPassword"
                               placeholder="пароль"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />);
            switchButton = (<button type="button"
                                    onClick={() => this.setState({mode: "otp"})}>Получить СМС с одноразовым паролем
                            </button>)
        }
        else if(this.state.mode === 'otp'){
            authField = (<input
                                type="text"
                                name="authPasswordFieldOtp"
                                placeholder="одноразовый код"
                                value={this.state.otp}
                                onChange={this.handleChange}
                        />);
            switchButton = (<button
                                type="button"
                                onClick={() => this.setState({mode: "password"})}>Войти по паролю
                            </button>)
        }
        if(this.props.token){
            return (
                <React.Fragment>
                    "Добро пожаловать!"
                    <button onClick={() => this.props.logoutUser()}>Выйти</button>
                </React.Fragment>
            )
        }
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
                        {authField}
                        <label className="checkbox-label col-md-8 offset-md-1" htmlFor="rememberMe">
                            <input className="checkbox"
                                   type="checkbox"
                                   name="rememberMe"
                                   id="rememberMe"
                                   onChange={this.handleChange}
                                   value={this.state.rememberMe}
                            /><p>запомнить меня</p></label>
                        {switchButton}
                        <p>{JSON.stringify(this.state.response)}</p>
                        <div>{(this.props.errorText)}</div>
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
        errorText: store.AuthReducer.loginError
    };
};

const MapDispatchToProps = dispatch => ({
    loginUser: (userData, rememberMe) => dispatch(loginUser(userData, rememberMe)),
    loginUserOtp: (userData, rememberMe) =>  dispatch(loginUserOtp(userData, rememberMe)),
    logoutUser: () => dispatch(logoutUser()),
    setLoginError: (error) => dispatch(setLoginError(error))
});

export default connect(MapStateToProps, MapDispatchToProps)(LoginForm);