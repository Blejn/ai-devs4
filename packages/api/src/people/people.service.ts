import fs from "fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";
import { PersonCSV } from "./types/people.types";
import { TaggedPeople } from "./schemas/tagged-people-schema";

const __filename = fileURLToPath(import.meta.url); // current file path
const __dirname = dirname(__filename); // current directory path

console.log("__filename", __filename);
console.log("__dirname", __dirname);
// TODO: implement people task logic
// 1. Parse CSV
// 2. Filter by criteria (male, age 20-40 in 2026, born in Grudziądz)
// 3. Tag jobs using LLM (Structured Output)
// 4. Filter by "transport" tag
// 5. Submit to hub

const filterByGender = (gender: string) => {
  return gender === "M";
};
const filterByBirthPlace = (birthPlace: string) => {
  return birthPlace === "Grudziądz";
};

export const peopleCsvParser = (): PersonCSV[] => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const peopleCsv = fs.readFileSync(
    path.join(__dirname, "files", "people.csv"),
    "utf8",
  );
  return parse(peopleCsv, { columns: true, skip_empty_lines: true });
};

const filterByAge = (birthDate: string) => {
  const TASK_YEAR = 2026;
  const birthYear = birthDate.split("-")[0];
  return (
    TASK_YEAR - Number(birthYear) >= 20 && TASK_YEAR - Number(birthYear) <= 40
  );
};

export const filterByCriteria = (people: PersonCSV[]) => {
  return people.filter(
    (person) =>
      filterByAge(person.birthDate) &&
      filterByGender(person.gender) &&
      filterByBirthPlace(person.birthPlace),
  );
};

export const filterByTransportTag = (people: TaggedPeople) => {
  return people.filter((person) => person.tags.includes("transport"));
};

export const savePeopleToJson = (people: TaggedPeople) => {
  fs.writeFileSync(
    path.join(__dirname, "files", "people.json"),
    JSON.stringify(people, null, 2),
  );
};
