// Placeholder Admin Auth API

export const attemptAdminLogin = async (email, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Hardcoded mock authentication check
  if (email === "admin@alphabuy.com" && password === "admin123") {
    return {
      success: true,
      token: "mock-admin-jwt-token-12345",
      user: {
        id: "admin_1",
        email: "admin@alphabuy.com",
        role: "SuperAdmin"
      }
    };
  } else {
    throw new Error("Invalid admin credentials");
  }
};
