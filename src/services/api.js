import axios from 'axios';

const api = axios.create({baseURL: 'http://178.128.145.152:8080'});
export default api;