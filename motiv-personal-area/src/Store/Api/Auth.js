import {BASE_URL} from "./Settings";
import Utils from "./Utils"


class Auth {

    patchUser = async (newData, userId) => {
        return await Utils.patchWithToken(`${BASE_URL}/user/${userId}`, newData, Utils.getToken());
    };

    authUser = async (userData, rememberMe) => {
        var response;
        if(userData.login == '79521316407' || userData.password == '1234'){
            response = {
                token: "foo",
                detail: ""
            }
        }
        else{
            response = {
                token: undefined,
                detail: "Неверный логин или пароль"
            }
        }
        //const response = await Utils.post(`${BASE_URL}/api/auth/login/`, userData);
        Utils.setToken(response.token, rememberMe);
        return response;
    };

    authUserOtp = async (userData, rememberMe) => {
        var response;
        if(userData.login === '79521316407' || userData.otp === '0000'){
            response = {
                token: "foo",
                detail: ""
            }
        }
        else{
            response = {
                token: undefined,
                detail: "Неверный логин или пароль"
            }
        }
        //const response = await Utils.post(`${BASE_URL}/api/auth/login/`, userData);
        Utils.setToken(response.token, rememberMe);
        return response;
    };

    logOutUser = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
    };

    //NOQA
    async validateToken() {
        return Utils.getToken()
    }

    async fetchUserOnSavedToken() {
        return Utils.getWithToken(BASE_URL + "/user/", Utils.getToken())
    }
}

export default new Auth();