import { z } from "zod";

export const taggedPeopleSchema = z.array(
  z.object({
    name: z.string().describe("Name of the person"),
    surname: z.string().describe("Surname of the person"),
    gender: z.string().describe("Gender of the person"),
    born: z.number().describe("Year of birth of the person"),
    city: z.string().describe("City of the person"),
    tags: z.array(z.string()).describe("Tags of the person"),
  }),
);

export type TaggedPeople = z.infer<typeof taggedPeopleSchema>;
