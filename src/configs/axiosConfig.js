import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

let axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export default axiosClient;