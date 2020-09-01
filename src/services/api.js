import { create } from 'axios';

const api = create({
  baseURL: 'https://reqres.in/api/',
});

export default api;
