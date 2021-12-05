import axiosClient from "./axiosClient";

const userApi = {
    register(data) {
        const url = '/users'
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/login/'
        return axiosClient.post(url, data);
    },
    getCurrent(access_token){
        const url = '/user-current'
        const config = {
            baseURL:'http://127.0.0.1:8000/api/v1',
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          };
        return axiosClient.get(url,config);
    },
    getAddress(){
        const url = '/address-user'
        var token = JSON.parse(localStorage.getItem("access_token"))
        const config = {
            baseURL:'http://127.0.0.1:8000/api/v1',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        return axiosClient.get(url,config);
    },
};

export default userApi