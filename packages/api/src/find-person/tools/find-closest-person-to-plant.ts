import { getDistance } from "../helpers/get-distance";
import { PersonLocation } from "../types/person-locations";
import { readLocationOfPlants } from "../helpers/read-location-of-plants";

export const findClosestPersonToPlant = async (person: PersonLocation) => {
  const plants = await readLocationOfPlants();
  let closestPlant = "";
  let closestDistance = 40000;

  for (const plant of Object.keys(plants.power_plants)) {
    const distance = getDistance(
      person.latitude,
      person.longitude,
      plants.power_plants[plant].latitude,
      plants.power_plants[plant].longitude,
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPlant = plants.power_plants[plant].code;
    }
  }
  return { closestPlant, closestDistance };
};
