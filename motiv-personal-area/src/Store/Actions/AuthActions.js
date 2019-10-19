import Auth from "../Api/Auth";

export const loginUser = (userData, rememberMe) => {
    return async dispatch => {
        try {
            const response = await Auth.authUser(userData, rememberMe);
            dispatch(_loginUser(response.data.token));
        } catch (e) {
            dispatch(_setLoginError(e.data.detail))
        }
    }
};

export const validateToken = () => {
    return async dispatch => {
        try {
            const token = await Auth.validateToken();
            dispatch(_loginUser(token))
        } catch (e) {
            console.log("token corrupted or expired");
            dispatch(_logoutUser())
        }
    }
};

export const fetchUserOnToken = () => {
    return async dispatch => {
        try {
            const response = await Auth.fetchUserOnSavedToken();
            dispatch(loginUser(response.data))
        } catch (e) {
            console.log("token corrupted or expired");
            dispatch(_logoutUser())
        }
    }
};

export const setLoginError = (error) => {
    return dispatch => {
        dispatch(_setLoginError(error))
    }
};

//Delete Y.Token action
export const logoutUser = () => {
    return dispatch => {
        Auth.logOutUser();
        dispatch(_logoutUser());
    }
};

//Get Y.Token action
const _loginUser = token => ({
    type: 'LOGIN_USER',
    payload: token
});

//Delete Y.Token action
const _logoutUser = () => ({
    type: 'LOGOUT_USER'
});

const _setLoginError = error => ({
    type: 'SET_LOGIN_ERROR',
    payload: error
});

const _unsetLoginError = () => ({
    type: 'UNSET_LOGIN_ERROR'
});