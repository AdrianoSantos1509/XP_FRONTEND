import axios from 'axios';

const api = axios.create({
  baseURL: '/', //  agora usa o proxy do Vite
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
