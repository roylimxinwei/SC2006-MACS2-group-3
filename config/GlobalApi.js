import axios from "axios";

const BASE_URL="https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY="AIzaSyAOuEs_zxFDQXynk8YZx35_nNWwzpsQy78";

const config = {
    headers:{
        'Content-Type':'application/json',
        "X-Goog-Api-Key" : API_KEY,
        "X-Goog-FieldMask": ['places.displayName', 'places.formattedAddress','places.location','places.photos',"places.ratings"]
    }
}

// const NewNearByPlace =(data) => axios.post(BASE_URL,data,config)
//   .catch(error => console.error('Error fetching nearby places:', error));

// Typically, the Google API Key is passed as a query parameter, not in the header.
const NewNearByPlace = (location, radius, type) => {
  const params = {
    location: location, // in the format "latitude,longitude"
    radius: radius, // in meters
    type: type, // type of place to search for
    key: API_KEY, // Your API key
  };

  return axios.get(BASE_URL, { params })
    .then(response => response.data)
    .catch(error => {
      // Handle errors more robustly here
      console.error('Error fetching nearby places:', error);
    //   throw error; // Re-throw the error so it can be handled by the caller
    });
};

export default{
    NewNearByPlace
}
