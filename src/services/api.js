import axios from 'axios';
const api = axios.create({baseURL: process.env.HOST'});
export default api;
