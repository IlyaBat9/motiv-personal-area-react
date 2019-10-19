import {BASE_URL} from "./Settings";
import Utils from "./Utils"

class Auth {

    patchUser = async (newData, userId) => {
        return await Utils.patchWithToken(`${BASE_URL}/user/${userId}`, newData, Utils.getToken());
    };

    authUser = async (userData, rememberMe) => {
        const response = await Utils.post(`${BASE_URL}/user/auth`, userData);

        Utils.setToken(response.data.token, rememberMe);

        return response;
    };

    registerUser = async (userData, rememberMe) => {
        const response = await Utils.post(`${BASE_URL}/user/create/`, userData);

        Utils.setToken(response.data.token, rememberMe);

        return response;
    };

    registerBusinessUser = async (userData, rememberMe) => {
        const response = await Utils.post(`${BASE_URL}/user/create/business/`, userData);

        Utils.setToken(response.data.token, rememberMe);

        return response;
    };

    logOutUser = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
    };

    async fetchUserOnSavedToken() {
        return Utils.getWithToken(BASE_URL + "/user/", Utils.getToken())
    }
}

export default new Auth();