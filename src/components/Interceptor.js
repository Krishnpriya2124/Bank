import axios from 'axios';


const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
    //   'Content-Type': 'application/json',
    //   'Accept-Language': 'ja',
    },
  });
  axiosInstance.interceptors.request.use(
    (config) => {
      const authTokens = JSON.parse(localStorage.getItem('tokens') || '{}');
      const token = authTokens?.accessToken;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => response)

const axiosPrivate = axiosInstance;

    
export { axiosPrivate};



  