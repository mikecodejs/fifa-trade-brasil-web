import axios from "axios";
import { getItem } from "../utils/asyncStorage";

const Api = axios.create({
  baseURL: "https://fifa-trade-brasil-api.herokuapp.com",
});

Api.interceptors.request.use(async (config) => {
  const token = String(await getItem("@token"));

  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

export { Api };
