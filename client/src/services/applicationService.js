import api from "./api";

export const getMyApplications = async () => {
  const response = await api.get("/applications/my");
  return response.data;
};

export const withdrawApplication = async (applicationId) => {
  const response = await api.delete(`/applications/${applicationId}`);
  return response.data;
};