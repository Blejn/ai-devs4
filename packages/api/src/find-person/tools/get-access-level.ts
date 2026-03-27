import { env } from "../../common/config";

const API_KEY = env.AI_DEV_API_KEY;
const ACCESS_LEVEL_URL = `https://hub.ag3nts.org/api/accesslevel`;
export const getAccessLevel = async (person: {
  name: string;
  surname: string;
  birthYear: number;
}) => {
  const rawPerson = {
    apikey: API_KEY,
    name: person.name,
    surname: person.surname,
    birthYear: person.birthYear,
  };

  const response = await fetch(ACCESS_LEVEL_URL, {
    method: "POST",
    body: JSON.stringify(rawPerson),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("Access level:", data);
  return data;
};

getAccessLevel({ name: "Albert", surname: "Skiba", birthYear: 1991 });
