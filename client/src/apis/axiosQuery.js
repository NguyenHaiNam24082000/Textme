import axiosClient from "./axiosClient";

//using create get request from client to server
export function getRequest(URL, config) {
  return axiosClient.get(URL, config).then((response) => response);
}

//using create post request from client to server
export function postRequest(URL, payload, config) {
  return axiosClient.post(URL, payload, config).then((response) => response);
}

//using create put request from client to server
export function putRequest(URL, payload, config) {
  return axiosClient.put(URL, payload, config).then((response) => response);
}

//using create patch request from client to server
export function patchRequest(URL, payload, config) {
  return axiosClient.patch(URL, payload, config).then((response) => response);
}

//using create delete request from client to server
export function deleteRequest(URL, config) {
  return axiosClient.delete(URL, config).then((response) => response);
}
