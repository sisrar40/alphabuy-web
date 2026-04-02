// Placeholder Parks API
import api from "./axiosConfig";

// export const fetchParks = async () => await api.get('/parks');
export const fetchParks = async () => {
  const response = await api.get('/parks');
  return response.data;
};

export const createPark = async (parkData) => {
  const response = await api.post('/admin/parks', parkData);
  return { success: true, message: "Park created successfully", data: response.data };
};
