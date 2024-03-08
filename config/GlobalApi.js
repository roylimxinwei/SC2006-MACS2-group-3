import axios from "axios";

const BASE_URL="https://places.googleapis.com/v1/places:searchNearby";
const API_KEY="Your_API-KEY";

const config = {
    headers:{
        'content-type':'application/json',
        "X-Goog-Api-Key" : API_KEY,
        "X-Goog-FieldMask": ['places.displayName', 'places.formattedAddress','places.location','places.photos']
    }
}

const NewNearByPlace =(data) => axios.post(BASE_URL,data,config)
  .catch(error => console.error('Error fetching nearby places:', error));

export default{
    NewNearByPlace
}
