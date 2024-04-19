import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = "AIzaSyAjbOeXgrY01MK0CSkd-M4IKI_kxvCqzac";

/**
 * Fetches the postal address for a given latitude and longitude using the Google Geocoding API.
 * 
 * This function constructs a request to the Google Geocoding API with the latitude and longitude
 * provided, and it expects to return a structured format of address components.
 * 
 * @param {number} lat - The latitude of the location.
 * @param {number} long - The longitude of the location.
 * @returns {Promise<Object>} A promise that resolves to the geocoding response data from Google.
 */
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
