import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import { PowerPlantsWithLocations } from "../types/power-plants";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readLocationOfPlants = async () => {
  const locationOfPlants = fs.readFileSync(
    path.join(__dirname, "..", "files", "power-plants-with-locations.json"),
    "utf8",
  );
  const plantsLocations: PowerPlantsWithLocations =
    JSON.parse(locationOfPlants);
  return plantsLocations;
};
