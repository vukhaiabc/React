import axios from "axios";

const axiosClient = axios.create({
    baseURL:'http://127.0.0.1:8000/api/v1',
    headers:{
        'Content-Type':'application/json'
    }
});

// Interceptors
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;

  }, function (error) {
    const {config,data,status} = error.response
    if(config.url === '/users' && status === 400) {
      
      const listError = data.username || []
      const mesError = listError[0]
      throw new Error(mesError)
    }
    if(config.url === '/login/' && status === 401) {
      
      const mesError = data.detail
      throw new Error(mesError)
    }
    return Promise.reject(error);
  });

export default axiosClient