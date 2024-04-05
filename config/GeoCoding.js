import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = "AIzaSyAjbOeXgrY01MK0CSkd-M4IKI_kxvCqzac";

// Typically, the Google API Key is passed as a query parameter, not in the header.
const getAddress = (lat, long) => {
  const params = {
    latlng: `${lat},${long}`,
    key: API_KEY, // Your API key
  };

  return axios
    .get(BASE_URL, { params })
    .then((response) => response.data)
    .catch((error) => {
      // Handle errors more robustly here
      console.error("Error fetching address:", error);
      //   throw error; // Re-throw the error so it can be handled by the caller
    });
};

export default {
  getAddress,
};
