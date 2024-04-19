/**
 * Converts an angle from degrees to radians.
 * @param {number} angle - The angle in degrees.
 * @returns {number} The angle in radians.
 */
export const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};

/**
 * Calculates the Haversine distance between two points on the earth specified in latitude and longitude.
 * 
 * The Haversine formula is an equation important in navigation, giving distances between two points on a sphere from their longitudes and latitudes.
 * 
 * @param {number} lat1 - Latitude of the first point in degrees.
 * @param {number} lon1 - Longitude of the first point in degrees.
 * @param {number} lat2 - Latitude of the second point in degrees.
 * @param {number} lon2 - Longitude of the second point in degrees.
 * @returns {number} The distance between the two points in kilometers. Returns -1 if the calculation fails.
 */
export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  console.log('Distance:', distance);
  // If the calculation fails, return -1 (or any other default value)
  if (isNaN(distance)) {
    return -1;
  }

  return distance;
};