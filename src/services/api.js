import axios from 'axios';

const BASE_URL = 'https://abz-agency-ta.onrender.com/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['Access-Control-Allow-Origin'] = true;
const defaultEndPoint = '/api/users?page=1&count=6';

const authHeader = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const fetchUsers = async endPoint => {
  const { data } = await axios.get(endPoint ? endPoint : defaultEndPoint);
  return data;
};

export const fetchUserById = async id => {
  const { data } = await axios.get(`/api/users/${id}`);
  return data;
};

export const fetchToken = async () => {
  const { data } = await axios.get('/auth/token');
  return data;
};

export const fetchPositions = async () => {
  const { data } = await axios.get('/api/positions');
  return data;
};

export const addUser = async (token, userData) => {
  try {
    authHeader.set(token);
    const { data } = await axios.post('/auth/users', userData);
    //authHeader.unset();
    return data;
  } catch (error) {
    console.log(error.toJSON());
  }
};
