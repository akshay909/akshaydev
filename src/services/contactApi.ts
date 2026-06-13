import api from "./api";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
}

export const contactApi = (data: ContactData) => {
  return api.post("/contact", data);
};

export const GetQueries = () => {
  return api.get("/contact/queries");
};

export const deleteQuery = (id: number) => {
  return api.delete(`/contact/${id}`);
};
