import { aiClient } from "../common/ai-client";
import { findClosestPersonToPlant } from "./tools/find-closest-person-to-plant";
import { getAccessLevel } from "./tools/get-access-level";
import { readBirthYearForPerson } from "./tools/read-birth-year-for-person";
import { readLocationOfPeople } from "./tools/read-location-of-people";
import { submitAnswer } from "./tools/submit-answear";
import { PersonLocation } from "./types/person-locations";

export const executeFunction = async (functionName: string, input: unknown) => {
  switch (functionName) {
    case "readLocationOfPeople":
      return readLocationOfPeople();
    case "findClosestPersonToPlant":
      return findClosestPersonToPlant(input as PersonLocation);
    case "getAccessLevel":
      return getAccessLevel(
        input as { name: string; surname: string; birthYear: number },
      );
    case "submitAnswer":
      return submitAnswer(
        input as {
          name: string;
          surname: string;
          accessLevel: string;
          powerPlant: string;
        },
      );
    case "readBirthYearForPerson":
      return readBirthYearForPerson(input as { name: string; surname: string });
  }
};
