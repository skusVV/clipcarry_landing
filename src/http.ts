import axios from 'axios';
import { API_URL } from './constants';

export const http = axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 600000
});

export const setToken = token => ({ headers: {'x-access-token': token}});
