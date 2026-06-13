import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/portfolio-backend/public/index.php/api`,
  withCredentials: true,
});

export default api;
