// Placeholder Dates API
import api from "./axiosConfig";

export const createAvailableDate = async (dateData) => {
  // return await api.post('/dates', dateData);
  console.log("Mock API: Added Date Slots", dateData);
  return { success: true, message: "Dates added successfully", data: dateData };
};
