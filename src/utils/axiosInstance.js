import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const res = error.response;
    if (res?.status === 401 && res.data?.message === 'Logged in elsewhere') {
      sessionStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
