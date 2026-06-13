"use client";

import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useRef,
} from "react";
import SideBar from "@/components/admin/sidebar/page";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Select from "react-select";
import {
  IconPlus,
  IconX,
  IconExternalLink,
  IconEdit,
  IconTrash,
  IconSearch,
  IconLoader,
  IconStar,
} from "@tabler/icons-react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addTechStack,
  getTechStack,
  updateTechStack,
  deleteTechStack,
  favProject,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProjectCount,
} from "@/services/projectApi";
import { showMessage } from "@/redux/slices/messageSlice";
import { useAppDispatch } from "@/redux/hooks";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  livelink: string;
  image?: string;
  is_fav: boolean;
  image_scroll: boolean;
  createdAt: string;
  categories?: number[]; // array of category IDs
  category?: string; // legacy, not used
}

interface FormData {
  title: string;
  description: string;
  tech: string[];
  livelink: string;
  image: File | null;
  image_scroll: boolean;
  categories: number[]; // array of category IDs
}

type TechOption = {
  icon: any;
  description: any;
  id: number;
  name: string;
  value: string;
  label?: string;
};

const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    background: "#18181b",
    borderColor: "#3f3f46",
    minHeight: "48px",
    "&:hover": { borderColor: "#6366f1" },
  }),
  menu: (base: any) => ({
    ...base,
    background: "#18181b",
    border: "1px solid #3f3f46",
    zIndex: 9999,
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isFocused ? "#27272a" : "#18181b",
    color: "#fff",
    "&:hover": { background: "#27272a" },
  }),
  multiValue: (base: any) => ({ ...base, background: "#6366f1" }),
  multiValueLabel: (base: any) => ({ ...base, color: "#fff" }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#fff",
    "&:hover": { background: "#4f46e5", color: "#fff" },
  }),
  input: (base: any) => ({ ...base, color: "#fff" }),
  placeholder: (base: any) => ({ ...base, color: "#71717a" }),
  singleValue: (base: any) => ({ ...base, color: "#fff" }),
};

export default function AddProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openTechModal, setOpenTechModal] = useState(false);
  const [techOptions, settechOptions] = useState<TechOption[]>([]);
  const [openManageTech, setOpenManageTech] = useState(false);
  const [editTech, setEditTech] = useState<any>(null);
  const [favLoading, setFavLoading] = useState<number | null>(null);
  const [favProjects, setFavProjects] = useState<number[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openManageCategory, setOpenManageCategory] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projectCount, setProjectCount] = useState(0);
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    tech: [],
    livelink: "",
    image: null,
    image_scroll: false,
    categories: [],
  });

  const [preview, setPreview] = useState<string | null>(null);

  const techFormik = useFormik({
    initialValues: {
      name: "",
      value: "",
      description: "",
      icon: "",
    },

    validate: (values) => {
      const errors: any = {};

      if (!values.name) errors.name = "Name is required";
      if (!values.value) errors.value = "Value is required";
      if (!values.description) errors.description = "Description is required";
      if (!values.icon) errors.icon = "Icon is required";

      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        await addTechStack(values);

        dispatch(
          showMessage({
            message: "Tech added successfully",
            status: "success",
          }),
        );

        fetchTechStack();
        resetForm();
        setOpenTechModal(false);
      } catch (err) {
        console.error(err);

        dispatch(
          showMessage({
            message: "Failed to add tech",
            status: "error",
          }),
        );
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProjectCount();
      const count = res.data;
      setProjectCount(count);
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchTechStack();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [searchQuery, projects]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProjects(nextPage);
  };

  const fetchProjects = async (pageNum = 1) => {
    try {
      setFetching(true);

      const res = await getProjects(pageNum, 9);

      if (pageNum === 1) {
        setProjects(res.data);
        setFilteredProjects(res.data);
        setHasMore(true);
      } else {
        setProjects((prev: any) => [...prev, ...res.data]);
        setFilteredProjects((prev: any) => [...prev, ...res.data]);
      }

      if (res.data.length < 9) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const fetchTechStack = async () => {
    try {
      setFetching(true);
      const res = await getTechStack();

      if (res && res.data) {
        const formatted = res.data.map((t: any) => ({
          ...t,
          label: t.name,
          value: t.value,
        }));

        settechOptions(formatted);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const filterProjects = () => {
    if (searchQuery) {
      const filtered = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  };

  const handleUpdateTech = async () => {
    if (
      !editTech.name ||
      !editTech.value ||
      !editTech.description ||
      !editTech.icon
    ) {
      dispatch(
        showMessage({
          message: "All fields are required",
          status: "error",
        }),
      );
      return;
    }

    try {
      await updateTechStack(editTech.id, {
        name: editTech.name,
        value: editTech.value,
        description: editTech.description,
        icon: editTech.icon,
      });

      dispatch(
        showMessage({
          message: "Tech updated successfully",
          status: "success",
        }),
      );

      setEditTech(null);
      fetchTechStack();
    } catch (error) {
      console.error(error);

      dispatch(
        showMessage({
          message: "Update failed",
          status: "error",
        }),
      );
    }
  };

  const handleDeleteTech = async (id: number) => {
    await deleteTechStack(id);
    fetchTechStack();
  };

  useEffect(() => {
    if (editing && form.image && typeof form.image === "string") {
      setPreview(form.image); // existing image url
    }
  }, [editing, form.image]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tech", JSON.stringify(form.tech));
    formData.append("livelink", form.livelink);
    formData.append("image_scroll", form.image_scroll ? "true" : "false");
    formData.append("categories", JSON.stringify(form.categories)); // send categories
    formData.append("_method", "PUT");
    if (form.image) {
      formData.append("image", form.image);
    }

    if (form.tech.length === 0) {
      dispatch(
        showMessage({
          message: "Please select at least one tech stack",
          status: "error",
        }),
      );

      setLoading(false);
      return;
    }

    try {
      const res = editing
        ? await updateProject(editing, formData)
        : await createProject(formData);

      const updatedProject: Project = res.data;

      if (editing) {
        setProjects(
          projects.map((p) => (p.id === editing ? updatedProject : p)),
        );
      } else {
        setProjects([...projects, updatedProject]);
      }
      filterProjects();
      dispatch(
        showMessage({
          message: editing
            ? "Project updated successfully!"
            : " Project created successfully!",
          status: "success",
        }),
      );
      resetForm();
    } catch (err) {
      console.error(err);
      dispatch(
        showMessage({
          message: "Failed to save project",
          status: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const editProject = (project: Project) => {
    setEditing(project.id);
    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech || [],
      livelink: project.livelink || "",
      image: null,
      image_scroll: Boolean(project.image_scroll),
      categories: (project.categories || []).map((c: any) => Number(c)),
    });

    if (project.image) {
      setPreview(
        `${process.env.NEXT_PUBLIC_API_URL}/portfolio-backend/public${project.image}`,
      );
    }
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteProject(deleteId);

      setProjects(projects.filter((p) => p.id !== deleteId));

      dispatch(
        showMessage({
          message: "Project deleted!",
          status: "success",
        }),
      );
    } catch (err) {
      console.error(err);
      dispatch(
        showMessage({
          message: "Failed to delete project",
          status: "error",
        }),
      );
    } finally {
      setOpenDelete(false);
      setDeleteId(null);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm({
      title: "",
      description: "",
      tech: [],
      livelink: "",
      image: null,
      image_scroll: false,
      categories: [],
    });

    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleForm = () => {
    const newValue = !showForm;
    setShowForm(newValue);

    if (!newValue) {
      resetForm();
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      if (res && res.data) {
        const formatted = res.data.map((c: any) => ({
          ...c,
          label: c.name,
          value: c.value,
          id: c.id,
        }));
        setCategoryOptions(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdateCategory = async () => {
    if (!editCategory?.name?.trim()) {
      dispatch(showMessage({ message: "Name is required", status: "error" }));
      return;
    }

    try {
      await updateCategory(editCategory.id, {
        name: editCategory.name.trim(),
        value: editCategory.value?.trim(),
        icon: editCategory.icon?.trim() || null,
      });

      dispatch(
        showMessage({
          message: "Category updated successfully",
          status: "success",
        }),
      );

      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      console.error(error);
      dispatch(showMessage({ message: "Update failed", status: "error" }));
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await deleteCategory(id);
      dispatch(
        showMessage({
          message: "Category deleted successfully",
          status: "success",
        }),
      );
      fetchCategories();
    } catch (err) {
      console.error(err);
      dispatch(showMessage({ message: "Delete failed", status: "error" }));
    }
  };

  const categoryFormik = useFormik({
    initialValues: {
      name: "",
      value: "",
      icon: "",
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.name.trim()) {
        errors.name = "Category name is required";
      }

      if (!values.value.trim()) {
        errors.value = "Category value (slug) is required";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await createCategory({
          name: values.name.trim(),
          value: values.value.trim(),
          icon: values.icon,
        });

        dispatch(
          showMessage({
            message: "Category added successfully",
            status: "success",
          }),
        );

        fetchCategories();
        resetForm();
        setOpenCategoryModal(false);
      } catch (err) {
        console.error(err);
        dispatch(
          showMessage({
            message: "Failed to add category",
            status: "error",
          }),
        );
      }
    },
  });

  const handleFav = async (id: number) => {
    try {
      setFavLoading(id);

      const res = await favProject(id);

      if (res.status === "added") {
        setFavProjects((prev) => [...prev, id]);
        await fetchProjects();
      } else {
        setFavProjects((prev) => prev.filter((p) => p !== id));
        await fetchProjects();
      }

      dispatch(
        showMessage({
          message: res.message,
          status: "success",
        }),
      );
    } catch (err: any) {
      dispatch(
        showMessage({
          message: err.message || "Failed",
          status: "error",
        }),
      );
    } finally {
      setFavLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <SideBar />

      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Projects
                </h1>
                <p className="text-zinc-400 mt-1">
                  {projectCount} total projects
                </p>
              </div>

              <button
                aria-label={
                  showForm ? "Cancel adding project" : "Add new project"
                }
                onClick={toggleForm}
                disabled={loading}
                className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-indigo-500/20 w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showForm ? (
                  <>
                    <IconX size={20} />
                    Cancel
                  </>
                ) : (
                  <>
                    <IconPlus size={20} />
                    Add Project
                  </>
                )}
              </button>
            </div>
          </div>

          <div
            className={`transition-all duration-300 mb-8 ${
              showForm
                ? "block opacity-100 translate-y-0"
                : "hidden opacity-0 -translate-y-4"
            }`}
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-white">
                {editing ? "Edit Project" : "Add New Project"}
              </h2>

              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Project Title *
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter project title"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Live Link
                    </label>
                    <input
                      name="livelink"
                      value={form.livelink}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Project description"
                    rows={4}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="tech"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Tech Stack *
                  </label>
                  <div className="flex items-center gap-3">
                    <Select
                      inputId="tech"
                      aria-label="Select Tech Stack"
                      options={techOptions}
                      isMulti
                      menuPortalTarget={
                        typeof window !== "undefined" ? document.body : null
                      }
                      menuPosition="fixed"
                      menuShouldScrollIntoView={false}
                      styles={{
                        ...customSelectStyles,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      value={techOptions.filter((opt) =>
                        form.tech.includes(opt.name),
                      )}
                      onChange={(selected: any) => {
                        const techArray = selected
                          ? selected.map((s: any) => s.name)
                          : [];
                        setForm({ ...form, tech: techArray });
                      }}
                      isDisabled={loading}
                      className="w-full"
                    />
                    <button
                      type="button"
                      aria-label="Add new tech stack"
                      onClick={() => setOpenTechModal(true)}
                      className="text-sm px-6 py-3 w-fit shrink-0 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      + Add Tech
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Category *
                  </label>
                  <div className="flex items-center gap-3">
                    <Select
                      inputId="category"
                      aria-label="Select Categories"
                      options={categoryOptions}
                      isMulti
                      menuPortalTarget={
                        typeof window !== "undefined" ? document.body : null
                      }
                      menuPosition="fixed"
                      styles={{
                        ...customSelectStyles,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      value={categoryOptions.filter((opt) =>
                        form.categories.includes(opt.id),
                      )}
                      onChange={(selected: any) => {
                        setForm({
                          ...form,
                          categories: selected
                            ? selected.map((item: any) => item.id)
                            : [],
                        });
                      }}
                      isDisabled={loading}
                      className="w-full"
                      placeholder="Select categories"
                    />
                    <button
                      type="button"
                      aria-label="Add new category"
                      onClick={() => setOpenCategoryModal(true)}
                      className="text-sm px-6 py-3 w-fit shrink-0 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      + Add Category
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-[80%_20%] gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Project Image *
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0] || null;

                        if (file) {
                          setForm({ ...form, image: file });
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                      disabled={loading}
                      className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-lg px-3 py-2"
                      required={!editing}
                    />
                    {editing && (
                      <p className="text-xs text-zinc-500 mt-1">
                        Note: To update the image, re-select a new file.
                      </p>
                    )}
                    {preview && (
                      <img
                        src={preview}
                        alt="preview"
                        className="mt-3 h-36 w-fit object-contain rounded-lg"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Image Scroll
                    </label>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.image_scroll}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            image_scroll: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />

                      <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-indigo-600 transition-colors"></div>

                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-zinc-800">
                  <button
                    type="button"
                    aria-label="Cancel form"
                    onClick={resetForm}
                    disabled={loading}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-6 py-3 rounded-lg disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    aria-label={editing ? "Update project" : "Save new project"}
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <IconLoader size={16} className="animate-spin" />
                    ) : null}
                    {editing ? "Update" : "Save"} Project
                  </button>
                </div>
              </form>
            </div>
          </div>

          {!showForm && (
            <div className="mb-6">
              <div className="relative">
                <IconSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={fetching}
                />
              </div>
            </div>
          )}
          {fetching && page === 1 ? (
            <div className="flex min-h-[50vh] bg-white dark:bg-black">
              <div className="flex-1 flex items-center justify-center">
                <IconLoader className="w-8 h-8 text-indigo-400 animate-spin" />
              </div>
            </div>
          ) : filteredProjects.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-zinc-900 border relative border-zinc-800 rounded-2xl overflow-hidden transition-all group"
                  >
                    <div
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="h-[250px] relative overflow-hidden"
                    >
                      {project.image ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/portfolio-backend/public/${project.image}`}
                          alt={project.title}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                          style={{
                            objectPosition:
                              hoveredId === project.id ? "bottom" : "top",
                            transition: "object-position 2.5s ease",
                          }}
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-zinc-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleFav(project.id)}
                      className={`${
                        project.is_fav ? "bg-white" : "bg-primary"
                      } absolute top-3 right-3  w-[40px] h-[40px] flex justify-center items-center rounded-full`}
                    >
                      {favLoading === project.id ? (
                        <IconLoader
                          className={`${
                            project.is_fav ? "text-black" : "text-white"
                          } w-5 h-5 animate-spin `}
                        />
                      ) : (
                        <IconStar
                          stroke={2}
                          size={20}
                          className={`${
                            project.is_fav
                              ? "fill-primary text-primary"
                              : "text-white"
                          }`}
                        />
                      )}
                    </button>

                    <div className="p-5 space-y-2">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-[500] text-lg text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 py-3">
                        {(project.tech || []).slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="text-xs bg-indigo-600/20 text-indigo-300 border border-indigo-600/30 px-3 py-1 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                        {(project.tech || []).length > 3 && (
                          <span className="text-xs text-zinc-500">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-zinc-800">
                        <a
                          href={project.livelink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                        >
                          <IconExternalLink size={16} /> Visit
                        </a>
                        <button
                          onClick={() => editProject(project)}
                          className="bg-amber-600/20 text-amber-400 border border-amber-600/30 px-3 py-2 rounded-lg hover:bg-amber-600/30"
                        >
                          <IconEdit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(project.id);
                            setOpenDelete(true);
                          }}
                          className="bg-red-600/20 text-red-400 border border-red-600/30 px-3 py-2 rounded-lg hover:bg-red-600/30"
                        >
                          <IconTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={loadMore}
                    className="px-6 py-2 bg-primary text-white rounded-lg"
                  >
                    {fetching ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            !showForm && (
              <div className="text-center py-12">
                <p className="text-zinc-400">No projects found.</p>
              </div>
            )
          )}
        </div>
      </div>
      {openDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 w-full max-w-md rounded-2xl shadow-xl border border-zinc-800">
            <div className="p-5 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-white">
                Delete Project
              </h2>
            </div>

            <div className="p-5 text-md text-zinc-300">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </div>

            <div className="flex justify-end gap-2 p-5 border-t border-zinc-800">
              <button
                onClick={() => setOpenDelete(false)}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {openTechModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 w-full max-w-md rounded-2xl border border-zinc-800">
            {/* Header */}
            <div className="p-5 border-b border-zinc-800 flex justify-between">
              <h2 className="text-white font-semibold">Add Tech Stack</h2>
              <button onClick={() => setOpenTechModal(false)}>✕</button>
            </div>

            <form onSubmit={techFormik.handleSubmit} className="p-5 space-y-4">
              <input
                name="name"
                placeholder="Name"
                onChange={techFormik.handleChange}
                value={techFormik.values.name}
                className="w-full p-2 rounded bg-zinc-800 text-white"
                required
              />

              <input
                name="value"
                placeholder="Value"
                onChange={techFormik.handleChange}
                value={techFormik.values.value}
                className="w-full p-2 rounded bg-zinc-800 text-white"
                required
              />

              <input
                name="description"
                placeholder="Description"
                onChange={techFormik.handleChange}
                value={techFormik.values.description}
                className="w-full p-2 rounded bg-zinc-800 text-white"
                required
              />

              <input
                name="icon"
                placeholder="Icon (Tabler icon)"
                onChange={techFormik.handleChange}
                value={techFormik.values.icon}
                className="w-full p-2 rounded bg-zinc-800 text-white"
                required
              />
              <div className="flex items-center flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setOpenManageTech(true)}
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Manage Tech Stack
                </button>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenTechModal(false)}
                    className="px-4 py-2 bg-zinc-700 rounded text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 rounded text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {openManageTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 w-full max-w-2xl rounded-2xl border border-zinc-800 max-h-[80vh] overflow-auto">
            {/* Header */}
            <div className="p-5 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900">
              <h2 className="text-white font-semibold text-xl">
                Manage Tech Stack
              </h2>
              <button
                onClick={() => {
                  setOpenManageTech(false);
                  setEditTech(null);
                }}
                className="text-zinc-400 hover:text-white"
              >
                <IconX size={24} />
              </button>
            </div>

            {/* List */}
            <div className="p-5 space-y-3">
              {techOptions.map((tech) => (
                <div
                  key={tech.id}
                  className="bg-zinc-800 rounded-lg p-4 border border-zinc-700"
                >
                  {editTech?.id === tech.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editTech.name}
                        onChange={(e) =>
                          setEditTech({ ...editTech, name: e.target.value })
                        }
                        placeholder="Name"
                        className="w-full bg-zinc-700 text-white rounded px-3 py-2"
                        required
                      />
                      <input
                        type="text"
                        value={editTech.value}
                        onChange={(e) =>
                          setEditTech({ ...editTech, value: e.target.value })
                        }
                        placeholder="Value"
                        className="w-full bg-zinc-700 text-white rounded px-3 py-2"
                        required
                      />
                      <input
                        type="text"
                        value={editTech.description}
                        onChange={(e) =>
                          setEditTech({
                            ...editTech,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description"
                        className="w-full bg-zinc-700 text-white rounded px-3 py-2"
                        required
                      />
                      <input
                        type="text"
                        value={editTech.icon}
                        onChange={(e) =>
                          setEditTech({ ...editTech, icon: e.target.value })
                        }
                        placeholder="Icon"
                        className="w-full bg-zinc-700 text-white rounded px-3 py-2"
                        required
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditTech(null)}
                          className="px-3 py-1 bg-zinc-600 text-white rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdateTech}
                          className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">
                          {tech.name}
                        </h3>
                        <p className="text-zinc-400 text-sm">
                          Value: {tech.value}
                        </p>
                        {tech.description && (
                          <p className="text-zinc-500 text-sm">
                            Description :{tech.description}
                          </p>
                        )}
                        {tech.icon && (
                          <p className="text-zinc-500 text-sm">
                            Icon: {tech.icon}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditTech(tech)}
                          className="bg-amber-600/20 text-amber-400 border border-amber-600/30 px-2 py-1 rounded"
                        >
                          <IconEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteTech(tech.id)}
                          className="bg-red-600/20 text-red-400 border border-red-600/30 px-2 py-1 rounded"
                        >
                          <IconTrash size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {techOptions.length === 0 && (
                <div className="text-center py-8 text-zinc-400">
                  No tech stacks added yet. Click "Add Tech" to create one.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-zinc-800 sticky bottom-0 bg-zinc-900">
              <button
                onClick={() => {
                  setOpenManageTech(false);
                  setOpenTechModal(true);
                }}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
              >
                + Add New Tech
              </button>
            </div>
          </div>
        </div>
      )}
      {openCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 w-full max-w-md rounded-2xl border border-zinc-800">
            <div className="p-5 border-b border-zinc-800 flex justify-between">
              <h2 className="text-white font-semibold">Add New Category</h2>
              <button
                onClick={() => setOpenCategoryModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={categoryFormik.handleSubmit}
              className="p-5 space-y-4"
            >
              {/* NAME */}
              <input
                name="name"
                placeholder="Category Name (e.g. AI, Health, Finance)"
                onChange={(e) => {
                  categoryFormik.handleChange(e);

                  // 👇 auto slug generate
                  const slug = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  categoryFormik.setFieldValue("value", slug);
                }}
                value={categoryFormik.values.name}
                className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              {/* VALUE (slug) */}
              <input
                name="value"
                placeholder="Slug (auto-generated)"
                onChange={categoryFormik.handleChange}
                value={categoryFormik.values.value}
                className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              {/* ICON */}
              <input
                name="icon"
                placeholder="Icon (e.g. icon name or URL)"
                onChange={categoryFormik.handleChange}
                value={categoryFormik.values.icon}
                className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setOpenCategoryModal(false);
                    setOpenManageCategory(true);
                  }}
                  className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1"
                >
                  Manage Categories
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenCategoryModal(false)}
                    className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
                  >
                    Save Category
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {openManageCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 w-full max-w-2xl rounded-2xl border border-zinc-800 max-h-[80vh] overflow-auto">
            <div className="p-5 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900">
              <h2 className="text-white font-semibold text-xl">
                Manage Categories
              </h2>
              <button
                onClick={() => {
                  setOpenManageCategory(false);
                  setEditCategory(null);
                }}
                className="text-zinc-400 hover:text-white"
              >
                <IconX size={24} />
              </button>
            </div>

            <div className="p-5 space-y-3">
              {categoryOptions.map((cat: any) => (
                <div
                  key={cat.id}
                  className="bg-zinc-800 rounded-lg p-4 border border-zinc-700"
                >
                  {editCategory?.id === cat.id ? (
                    <div className="space-y-3">
                      {/* NAME */}
                      <input
                        type="text"
                        placeholder="Category Name"
                        value={editCategory.name}
                        onChange={(e) => {
                          const name = e.target.value;

                          // auto slug
                          const slug = name.toLowerCase().replace(/\s+/g, "-");

                          setEditCategory({
                            ...editCategory,
                            name,
                            value: slug,
                          });
                        }}
                        className="w-full bg-zinc-700 text-white rounded px-4 py-3"
                      />

                      <input
                        type="text"
                        placeholder="Slug"
                        value={editCategory.value}
                        onChange={(e) =>
                          setEditCategory({
                            ...editCategory,
                            value: e.target.value,
                          })
                        }
                        className="w-full bg-zinc-700 text-white rounded px-4 py-3"
                      />

                      <input
                        type="text"
                        placeholder="Icon (e.g. IconHeart)"
                        value={editCategory.icon || ""}
                        onChange={(e) =>
                          setEditCategory({
                            ...editCategory,
                            icon: e.target.value,
                          })
                        }
                        className="w-full bg-zinc-700 text-white rounded px-4 py-3"
                      />

                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditCategory(null)}
                          className="px-5 py-2 bg-zinc-600 text-white rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdateCategory}
                          className="px-5 py-2 bg-green-600 text-white rounded-lg"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-medium">{cat.name}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditCategory(cat)}
                          className="bg-amber-600/20 text-amber-400 border border-amber-600/30 px-3 py-2 rounded-lg"
                        >
                          <IconEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="bg-red-600/20 text-red-400 border border-red-600/30 px-3 py-2 rounded-lg"
                        >
                          <IconTrash size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {categoryOptions.length === 0 && (
                <div className="text-center py-12 text-zinc-400">
                  No categories yet. Add your first category!
                </div>
              )}
            </div>

            <div className="p-5 border-t border-zinc-800 sticky bottom-0 bg-zinc-900">
              <button
                onClick={() => {
                  setOpenManageCategory(false);
                  setOpenCategoryModal(true);
                }}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium"
              >
                + Add New Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
