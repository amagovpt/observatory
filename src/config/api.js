import axios from "axios";
import dataJSON from '../utils/data.json'

const baseURLDEV = process.env.REACT_APP_AMP_DEV_SERVER;
const baseURLPPR = process.env.REACT_APP_AMP_PPR_SERVER;
const baseURLPROD = process.env.REACT_APP_AMP_PROD_SERVER;

export const api = axios.create({
  baseURL: baseURLDEV,
});


export const getObservatoryData = async () => {
  const {response, err} = await getObservatoryByAPI();
  //const {response, err} = await getObservatoryByLocal();
  return { response, err };
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