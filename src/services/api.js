import axios from 'axios';
const api = axios.create({baseURL: 'https://api-prod-gestao.herokuapp.com'});
export default api;

// const api = axios.create({baseURL: process.env.URL || 'http://localhost:8080'});