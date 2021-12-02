import axiosClient from "./axiosClient";

const brandApi = {
    getAll(params) {
        const url = '/brand/'
        return axiosClient.get(url, { params })
    },
    get(id) {
        const url = `/brand/${id}`
        return axiosClient.get(url)
    },

};

export default brandApi