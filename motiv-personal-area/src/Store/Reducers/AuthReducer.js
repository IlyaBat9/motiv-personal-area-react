const initialState = {
    token: undefined,
    loginError: undefined
};

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOGIN_ERROR':
            return {...state, loginError: action.payload};
        case 'UNSET_LOGIN_ERROR':
            return {...state, loginError: undefined};
        case 'LOGIN_USER':
            return {...state, token: action.payload, loginError: undefined};
        case 'LOGOUT_USER':
            return initialState;
        default:
            return state;
    }
}