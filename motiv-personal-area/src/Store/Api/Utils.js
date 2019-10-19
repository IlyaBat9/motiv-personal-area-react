import axios from "axios";

class Utils {

    getToken = () => {
        let token = sessionStorage.getItem("token");
        if (!token) {
            token = localStorage.getItem("token")
        }
        return token
    };

    setToken = (token, rememberMe) => {
        if (!rememberMe) {
            sessionStorage.setItem("token", token);
        } else {
            localStorage.setItem("token", token);
        }
    };

    async get(url) {
        try {
            return await axios.get(url);
        } catch (e) {
            throw e.response;
        }
    }

    async post(url, data) {
        try {
            return await axios.post(url, data);
        } catch (e) {
            throw e.response;
        }
    }

    async patchWithToken(url, data, token){
        try {
            return await axios.patch(url, data, {
                headers: {
                    Authorization: `token ${token}`,
                },
            }, data)
        } catch (e) {
            throw e.response
        }
    }

    async getWithToken(url, token){
        try {
            return await axios.get(url, {
                headers: {
                    Authorization: `token ${token}`,
                },
            })
        } catch (e) {
            throw e.response
        }
    }

    async postWithToken(url, token, payload){
        try {
            return await axios.post(url, payload, {headers: { "Authorization": `token ${token}`}})
        }
        catch (e) {
            throw e.response;
        }
    }
}

export default new Utils();