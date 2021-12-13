import axiosClient from "./axiosClient";

const productApi = {
    getAll(params) {
        const url = '/product/'
        return axiosClient.get(url, { params })
    },
    get(id) {
        const url = `/product/${id}/`
        return axiosClient.get(url)
    },
    createRate(idProduct,data) {
        const url = `/product/${idProduct}/rating/`
        const token = JSON.parse(localStorage.getItem("access_token"))
        const config = {
            baseURL: 'http://127.0.0.1:8000/api/v1',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return axiosClient.post(url,data,config);
    },
    getRating(id) {
        const url = `/product/${id}/listRating/`
        return axiosClient.get(url)
    },

};

export default productApi