import api from "./api";

export const getProjects = (page: number, limit: number) => {
  return api.get(`/projects?page=${page}&limit=${limit}`);
};

export const createProject = (data: FormData) => {
  return api.post("/projects", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProject = async (id: number, data: FormData) => {
  return await api.post(`/projects/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProject = (id: number) => {
  return api.delete(`/projects/${id}`);
};

export const getSingleProject = (id: number) => {
  return api.get(`/projects/${id}`);
};

export const addTechStack = (data: any) => {
  return api.post("/projects/techstack", data);
};

export const getTechStack = () => {
  return api.get("/projects/techstack");
};

export const getProjectCount = () => {
  return api.get("/projects/projects-count");
};


export const getXmlTechStack = async () => {
  const res = await api.get("/projects/techstack");
  return res.data; // ensure this is array
};

export const getXmlCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const updateTechStack = (id: number, data: any) => {
  return api.put(`/projects/techstack/${id}`, data);
};

export const deleteTechStack = (id: number) => {
  return api.delete(`/projects/techstack/${id}`);
};

export const projectsCounts = () => {
  return api.get("/projects/counts");
};

export const projectsCategories = () => {
  return api.get("/categories/projects-categories");
};

export const favProject = async (id: number) => {
  const res = await api.post(`/projects/favProject/${id}`);
  return res.data;
};

export const getProjectsByFrameWork = async (
  framework: string,
  page: number = 1,
  limit: number = 9,
) => {
  const res = await api.get(
    `/projects/frameworks?framework=${framework}&page=${page}&limit=${limit}`,
  );

  return res.data;
};

export const getProjectsByCategory = async (
  category: string,
  page: number = 1,
  limit: number = 9,
) => {
  const res = await api.get(
    `/projects/categories?category=${category}&page=${page}&limit=${limit}`,
  );

  return res.data;
};

export const getCategories = () => {
  return api.get("/categories");
};

export const createCategory = (data: any) => {
  return api.post("/categories", data);
};

export const updateCategory = (id: number, data: any) => {
  return api.put(`/categories/${id}`, data);
};

export const deleteCategory = (id: number) => {
  return api.delete(`/categories/${id}`);
};
