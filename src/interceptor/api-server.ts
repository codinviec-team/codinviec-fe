import axios from "axios";

const apiServer = axios.create({
  baseURL: process.env.API_URL,
});

export default apiServer;
