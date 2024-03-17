// distanceCalculator.js

const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};

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
