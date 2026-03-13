import Anthropic from "@anthropic-ai/sdk";
import { env } from "../config.js";

export const aiClient = new Anthropic({
  apiKey: env.ANTROPIC_API_KEY,
});
