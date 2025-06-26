import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// console.log(process.env.BASE_URL);
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export default axiosInstance;