import { z } from "zod";

export const apiEnvSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  ANTROPIC_KEY_NAME: z.string().min(1),
  ANTROPIC_API_KEY: z.string().min(1),
  AI_DEV_API_KEY: z.string().min(1),
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;
