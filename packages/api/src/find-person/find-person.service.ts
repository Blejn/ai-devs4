import { fileURLToPath } from "url";
import { env } from "../common/config.js";
import { PowerPlantsResponse } from "./types/power-plants.js";
import path, { dirname } from "path";
import fs from "fs";
import { TaggedPeople } from "../people/schemas/tagged-people-schema.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const LOCATIONS_URL = `https://hub.ag3nts.org/data/${env.AI_DEV_API_KEY}/findhim_locations.json`;
const SUSPICIOUS_PEOPLE_URL = `https://hub.ag3nts.org/api/location`;

export const fetchPowerPlantsLocations =
  async (): Promise<PowerPlantsResponse> => {
    const response = await fetch(LOCATIONS_URL);
    const data = await response.json();

    return data;
  };

export const findLocationOfPerson = async () => {
  const locationOfPeople = [];
  const suspiciousPeople = await readSuspiciousPeople();

  for (const person of suspiciousPeople) {
    const data = await fetch(SUSPICIOUS_PEOPLE_URL, {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData: { latitude: number; longitude: number }[] =
      await data.json();

    for (const location of responseData) {
      const personLocation = {
        name: person.name,
        surname: person.surname,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      locationOfPeople.push(personLocation);
    }
  }
  fs.writeFileSync(
    path.join(_dirname, "files", "location-of-people.json"),
    JSON.stringify(locationOfPeople, null, 2),
  );
};

const readSuspiciousPeople = () => {
  const API_KEY = env.AI_DEV_API_KEY;
  const data = fs.readFileSync(
    path.join(_dirname, "files", "people.json"),
    "utf8",
  );
  const people: TaggedPeople = JSON.parse(data);
  const suspiciousPeople = people.map((person) => {
    return {
      apikey: API_KEY,
      name: person.name,
      surname: person.surname,
    };
  });

  return suspiciousPeople;
};

findLocationOfPerson();
