import axios from 'axios';

const baseURL = import.meta.env.VITE_AMP_SERVER;

export const api = axios.create({
  baseURL
});