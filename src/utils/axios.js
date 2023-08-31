import axios from 'axios';

const url = 'http://192.168.1.5/thuctaptn/views';
export const axiosInstance = axios.create({baseURL: url});
