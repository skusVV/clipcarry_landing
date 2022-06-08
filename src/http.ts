import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 1000
});

export const setToken = token => ({ headers: {'x-access-token': token}});
