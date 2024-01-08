import axios from "axios";

// Global
const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  params: {
    token: localStorage.getItem("token"),
  },
});

export default client;
