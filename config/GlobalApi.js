import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = "AIzaSyAjbOeXgrY01MK0CSkd-M4IKI_kxvCqzac";

// const config = {
//     headers:{
//         'Content-Type':'application/json',
//         "X-Goog-Api-Key" : API_KEY,
//         "X-Goog-FieldMask": ['places.displayName', 'places.formattedAddress','places.location','places.photos',"places.ratings"]
//     }
// }

// const NewNearByPlace =(data) => axios.post(BASE_URL,data,config)
//   .catch(error => console.error('Error fetching nearby places:', error));

/**
 * Fetches nearby places from Google Places API based on specified parameters.
 * @param {string} location - The latitude and longitude of the location (format: "latitude,longitude").
 * @param {number} radius - The radius around the location in meters within which to search.
 * @param {string} type - The type of place to search for (e.g., 'restaurant').
 * @param {string} keyword - Additional keyword to refine the search (e.g., 'sushi').
 * @returns {Promise} A promise that resolves to the response data from the API if successful.
 */
const NewNearByPlace = (location, radius, type, keyword) => {
  const params = {
    location: location, // in the format "latitude,longitude"
    radius: radius, // in meters
    type: type, // type of place to search for
    keyword: keyword,
    key: API_KEY, // Your API key
  };

  return axios
    .get(BASE_URL, { params })
    .then((response) => response.data)
    .catch((error) => {
      // Handle errors more robustly here
      console.error("Error fetching nearby places:", error);
      //   throw error; // Re-throw the error so it can be handled by the caller
    });
};

/**
 * Fetches detailed reviews for a specific place using Google Place Details API.
 * @param {Object} params - The parameters for the API request, including the place_id and the API key.
 * @returns {Promise} A promise that resolves to the detailed place data, including reviews.
 */
const GetReviews = (params) => {
  return axios
    .get("https://maps.googleapis.com/maps/api/place/details/json", { params })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching reviews:", error);
    });
};

// const GetNearbyPlaceDetails = (placeId) => {
//   const params = {
//     place_id: placeId,
//     key: API_KEY,
//   };

//   return axios.get("https://maps.googleapis.com/maps/api/place/details/json", { params })
//     .then(response => response.data)
//     .catch(error => {
//       console.error('Error fetching place details:', error);
//     });
// };

export default {
  NewNearByPlace,
  GetReviews,
};
