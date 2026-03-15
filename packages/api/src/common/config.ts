import "dotenv/config";
import { apiEnvSchema } from "@ai-devs/shared";

export const env = apiEnvSchema.parse(process.env);
