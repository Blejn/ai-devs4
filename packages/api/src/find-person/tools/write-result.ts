import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const writeResult = async (result: {
  name: string;
  surname: string;
  birthdate: string;
  closestDistance: number;
  accessLevel: string;
}) => {
  fs.writeFileSync(
    path.join(__dirname, "..", "files", "result.json"),
    JSON.stringify(result, null, 2),
  );
};
