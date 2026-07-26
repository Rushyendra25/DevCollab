import api from "./api";

export const createProject = async (projectData) => {
  const response = await api.post("/projects", projectData);

  return response.data;
};

export const getAllProjects = async () => {
  const response = await api.get("/projects");

  return response.data;
};

export const getProjectById = async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  };

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);

  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);

  return response.data;
};

export const applyToProject = async (projectId) => {
    const response = await api.post(`/applications/${projectId}`);
  
    return response.data;
  };

  export const getMyProjects = async () => {
    const response = await api.get("/projects/my/projects");
  
    return response.data;
  };

  export const getProjectApplications = async (projectId) => {
    const response = await api.get(
      `/applications/project/${projectId}`
    );
  
    return response.data;
  };
  
  export const updateApplicationStatus = async (
    applicationId,
    status
  ) => {
    const response = await api.put(
      `/applications/${applicationId}`,
      { status }
    );
  
    return response.data;
  };