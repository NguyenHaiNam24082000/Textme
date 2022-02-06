import axiosClient from "./axiosClient";
const productApi = {
    getAll: (params) =>{
        const url = '/products';
        return axiosClient.get(url, {params: params});
    },
    get: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
}

export default productApi;