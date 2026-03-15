import z from "zod";

const TaskResultSchema = z.object({
  apikey: z.string(),
  task: z.string(),
  answer: z.unknown(),
});

export type TaskResultRequest = z.infer<typeof TaskResultSchema>;
