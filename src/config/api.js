import axios from "axios";
import dataJSON from '../utils/data.json'

const baseURL = process.env.REACT_APP_AMP_SERVER;
console.log("ALL Environment Variables:", process.env);
console.log("API Base URL:", baseURL);
console.log("API Data Source:", process.env.REACT_APP_API_DATA_SOURCE);

export const api = axios.create({
  baseURL: baseURL,
});

export const getObservatoryData = async () => {
  const useAPI = process.env.REACT_APP_API_DATA_SOURCE === 'remote';
  return useAPI ? getObservatoryByAPI() : getObservatoryByLocal();
}

const getObservatoryByAPI = async () => {
  let err
  const response = await api.get("/observatory")
  .catch(function (error) {
    err = error;
  })
  return { response, err };
}

const getObservatoryByLocal = async () => {
  const response = dataJSON
  const err = {}
  return { response, err };
}