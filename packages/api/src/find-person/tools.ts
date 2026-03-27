import { Tool } from "@anthropic-ai/sdk/resources";

export const tools: Tool[] = [
  {
    name: "readLocationOfPeople",
    description:
      "Read all people locations from file. Returns array of objects with name, surname, latitude, longitude.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "findClosestPersonToPlant",
    description:
      "Calculate distance between a person's location and all power plants. Returns the closest plant name, code and distance in km.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Name of the person" },
        surname: { type: "string", description: "Surname of the person" },
        latitude: { type: "number", description: "Latitude of the person" },
        longitude: { type: "number", description: "Longitude of the person" },
      },
      required: ["name", "surname", "latitude", "longitude"],
    },
  },
  {
    name: "getAccessLevel",
    description:
      "Get the access level of a person from API. Requires name, surname and birth year.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Name of the person" },
        surname: { type: "string", description: "Surname of the person" },
        birthYear: {
          type: "number",
          description: "Birth year of the person (e.g. 1987)",
        },
      },
      required: ["name", "surname", "birthYear"],
    },
  },
  {
    name: "submitAnswer",
    description: "Submit the final answer to /verify endpoint.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Name of the suspect" },
        surname: { type: "string", description: "Surname of the suspect" },
        accessLevel: {
          type: "number",
          description: "Access level of the person",
        },
        powerPlant: {
          type: "string",
          description: "Power plant code (e.g. PWR1234PL)",
        },
      },
      required: ["name", "surname", "accessLevel", "powerPlant"],
    },
  },
  {
    name: "readBirthYearForPerson",
    description:
      "Read the birth year of a person from file. Requires name and surname.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Name of the person" },
        surname: { type: "string", description: "Surname of the person" },
      },
      required: ["name", "surname"],
    },
  },
];
