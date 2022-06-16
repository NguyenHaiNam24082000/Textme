import axios from "axios";
import queryString from "query-string";

//Set up default config for http requests here
// Please have a look at https://github.com/axios#request-config for more info
// GET — requests a representation of the specified resource. Requests using GET should only retrieve data.
// POST — submits data to the specified resource.
// PUT — replaces all current representations of the target resource with the request data.
// DELETE — deletes the specified resource.
// PATCH — applies partial modifications to a resource.
const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    Accept: "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
  },
  paramsSerializer: function (params) {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    if (localStorage.user) {
      const userStorage = JSON.parse(localStorage.getItem("user"));
      config.headers.Authorization = `Bearer ${userStorage?.tokens?.access?.token}`;
    }
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // Do something with response data
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 5000;

axiosClient.defaults.withCredentials = true;

export default axiosClient;
