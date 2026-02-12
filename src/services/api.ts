import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Substitua pela URL do seu backend
});

export default api;