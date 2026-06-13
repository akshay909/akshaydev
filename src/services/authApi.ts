import api from "./api";

interface LoginData {
  username: string;
  password: string;
}

export const loginApi = (data: LoginData) => {
  return api.post("/auth/login", data);
};

export const meApi = () => {
  return api.get("/auth/me");
};
