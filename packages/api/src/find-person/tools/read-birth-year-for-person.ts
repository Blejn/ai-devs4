import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

interface PersonResponse {
  name: string;
  surname: string;
  birthYear: number;
}
export const readBirthYearForPerson = (person: {
  name: string;
  surname: string;
}): PersonResponse => {
  const peoplelist = fs.readFileSync(
    path.join(_dirname, "..", "files", "people.json"),
    "utf8",
  );
  const parsedPeopleList: PersonResponse[] = JSON.parse(peoplelist);
  const responsePerson = parsedPeopleList.find(
    (p) => p.surname === person.surname && p.name === person.name,
  );

  if (!responsePerson) {
    throw new Error("Person not found");
  }
  return responsePerson;
};
