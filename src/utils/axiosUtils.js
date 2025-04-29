import axios from "axios";

export const backAPI = axios.create({
  baseURL: "https://project-devstudents-node-js.onrender.com",
});

export const setAuthHeader = (token) => {
  backAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAuthHeader = () => {
  delete backAPI.defaults.headers.common.Authorization;
};
