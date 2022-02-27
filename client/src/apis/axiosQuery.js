import axiosClient from "./axiosClient";

//using create get request from client to server
export function getRequest(URL) {
  return axiosClient.get(URL).then((response) => response);
}

//using create post request from client to server
export function postRequest(URL, payload) {
  return axiosClient.post(URL, payload).then((response) => response);
}

//using create put request from client to server
export function putRequest(URL, payload) {
    return axiosClient.put(URL,payload).then((response) => response);
}

//using create patch request from client to server
export function patchRequest(URL, payload) {
  return axiosClient.patch(URL, payload).then((response) => response);
}

//using create delete request from client to server
export function deleteRequest(URL) {
  return axiosClient.delete(URL).then((response) => response);
}
