import axios from "axios";
import dataJSON from "../../utils/data.json"

export const api = axios.create({
  baseURL: "http://10.55.37.16:/api",
});


export const getObservatoryData = async () => {
  // const {response, err} = await getObservatoryByAPI();
  const {response, err} = await getObservatoryByLocal();
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