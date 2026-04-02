// Placeholder Admin Auth API

import api from "./axiosConfig";

export const attemptAdminLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return {
      success: true,
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    throw new Error(error.response?.data?.error || "Invalid admin credentials");
  }
};
