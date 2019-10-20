import Utils from "./Utils";
import {BASE_URL} from "./Settings";

class Data {
    fetchData = async (token) => {
        return await Utils.getWithToken(BASE_URL + '/api/info/full/', token)
    };
}

export default new Data();