// Placeholder Parks API
import api from "./axiosConfig";

// export const fetchParks = async () => await api.get('/parks');
export const fetchParks = async () => {
  return [
    { id: "p1", name: "Adventure City Theme Park", location: "Downtown", price: 1199 },
    { id: "p2", name: "Aqua Splash Water Park", location: "Westside", price: 899 },
  ];
};

export const createPark = async (parkData) => {
  // return await api.post('/parks', parkData);
  console.log("Mock API: Created Park", parkData);
  return { success: true, message: "Park created successfully", data: parkData };
};
