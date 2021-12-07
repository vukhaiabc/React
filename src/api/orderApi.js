import axiosClient from "./axiosClient";

const orderApi = {
    createOrder(data){
        const url = '/order/'
        var token = JSON.parse(localStorage.getItem("access_token"))
        const config = {
            method: 'post',
            baseURL:'http://127.0.0.1:8000/api/v1',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
   
        return axiosClient.post(url,data,config);
    },
};

export default orderApi