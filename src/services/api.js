import axios from 'axios';

const api = axios.create({baseURL: 'https://api-prod-gestao.herokuapp.com'});
export default api;