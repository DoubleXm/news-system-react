import axios from 'axios';
import { store } from '../../redux';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.timeout = 1000 * 10;

axios.interceptors.request.use(config => {
  const { loginReducer } = store.getState();
  if (loginReducer && loginReducer.token) {
    config.headers['Authorization'] = loginReducer.token;
  }
  return config;
});

axios.interceptors.response.use(res => {
  if (res.status === 200) {
    return res.data;
  }
});

export function request(method, url, plyload) {
  return axios.request({ method, url, ...plyload });
}
