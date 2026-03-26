const RADIUS = 6371;
export const getDistance = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number => {
  const dLat = (latitude2 - latitude1) * (Math.PI / 180);
  const dLon = (longitude2 - longitude1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latitude1 * (Math.PI / 180)) *
      Math.cos(latitude2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = RADIUS * c;
  return d;
};
