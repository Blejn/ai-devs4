import { PowerPlantsResponse } from "../types/power-plants";
import { env } from "../../common/config";
import { writeFileSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const LOCATIONS_URL = `https://hub.ag3nts.org/data/${env.AI_DEV_API_KEY}/findhim_locations.json`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchPowerPlantsInfo = async (): Promise<PowerPlantsResponse> => {
  const response = await fetch(LOCATIONS_URL);
  const data = await response.json();

  return data;
};

const addLocationsToPowerPlants = async () => {
  const data = await fetchPowerPlantsInfo();
  const newData = {
    power_plants: {},
  };
  for (const [key, value] of Object.entries(data.power_plants)) {
    const response = await findLatitudeAndLongitude(key);
    if (!response) {
      console.log(`No response for ${key}`);
      return;
    }
    const latitude = response.lat;
    const longitude = response.lon;
    Object.assign(newData.power_plants, {
      [key]: {
        is_active: data.power_plants[key].is_active,
        power: data.power_plants[key].power,
        code: data.power_plants[key].code,
        latitude: latitude,
        longitude: longitude,
      },
    });
  }
  console.log(JSON.stringify(newData, null, 2));

  writeFileSync(
    path.join(__dirname, "..", "files", "power-plants-with-locations.json"),
    JSON.stringify(newData, null, 2),
  );
  return newData;
};

const findLatitudeAndLongitude = async (city: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${city}&format=json`,
    {
      headers: {
        "User-Agent": "ai-devs-learning/1.0",
      },
    },
  );
  const data = await response.json();
  return data[0];
};

addLocationsToPowerPlants();
