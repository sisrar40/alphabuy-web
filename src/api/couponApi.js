// Placeholder Coupons API
import api from "./axiosConfig";

export const fetchCoupons = async () => {
  return [
    { id: "c1", code: "SUMMER10", type: "percentage", value: 10, minAmount: 1000, expiry: "2025-08-31", active: true },
    { id: "c2", code: "FLAT500", type: "fixed", value: 500, minAmount: 2000, expiry: "2025-12-31", active: false },
  ];
};

export const createCoupon = async (couponData) => {
  // return await api.post('/coupons', couponData);
  console.log("Mock API: Created Coupon", couponData);
  return { success: true, message: "Coupon created successfully", data: couponData };
};

export const deleteCoupon = async (id) => {
  console.log("Mock API: Deleted Coupon", id);
  return { success: true, message: "Coupon deleted" };
};

export const toggleCouponStatus = async (id, status) => {
  console.log(`Mock API: Toggled Coupon \${id} to \${status}`);
  return { success: true };
};
