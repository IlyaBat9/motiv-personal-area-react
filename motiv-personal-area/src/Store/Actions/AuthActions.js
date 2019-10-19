import Auth from "../Api/Auth";

export const loginUser = (token) => {
    return async dispatch => {
        try {
            const response = await Auth.authUser(userData, rememberMe);
            dispatch(loginUser(response.data));
        } catch (e) {
            // NOT IMPLEMENTED dispatch(setLoginError(e.data.detail));
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
            dispatch(logOutUser())
        }
    }
};

//Delete Y.Token action
export const logoutUser = () => {
    return dispatch => {
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