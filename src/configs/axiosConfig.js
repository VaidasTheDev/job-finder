import axios from "axios";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

let axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Authorization": "Basic NmJkY2Y4YWItZjg1MS00NTg1LWE0ZmMtZmE1NDIyMTA4MjAyOg==",
    'Access-Control-Allow-Origin': '*'
  }
});

export default axiosClient;