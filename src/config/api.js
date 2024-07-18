import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.55.37.16:/api",
});


export const getObservatoryData = async () => {
  let err
  const response = await api.get("/observatory")
  .catch(function (error) {
    err = error;
  })
  return { response, err };
}