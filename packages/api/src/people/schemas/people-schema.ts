import { z } from "zod";
import { taggedPeopleSchema } from "./tagged-people-schema";

export const peopleSchema = {
  type: "json_schema" as const,
  name: "people",
  strict: true,
  schema: z.toJSONSchema(taggedPeopleSchema),
};
