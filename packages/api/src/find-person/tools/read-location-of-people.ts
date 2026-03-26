import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import { PersonLocation } from "../types/person-locations";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readLocationOfPeople = async (): Promise<PersonLocation[]> => {
  console.log(__dirname);
  const locationsOfPeople = fs.readFileSync(
    path.join(__dirname, "..", "files", "location-of-people.json"),
    "utf8",
  );
  const personLocations: PersonLocation[] = JSON.parse(locationsOfPeople);

  if (!personLocations) {
    throw new Error("No person locations found");
  }
  if (!Array.isArray(personLocations)) {
    throw new Error("Person locations is not an array");
  }
  return personLocations;
};
