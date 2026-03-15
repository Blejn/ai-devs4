import { Router } from "express";
import type { ApiResponse } from "@ai-devs/shared";
import {
  filterByCriteria,
  filterByTransportTag,
  peopleCsvParser,
} from "./people.service";
import { aiClient } from "../common/ai-client";
import fs from "fs";
import path, { dirname } from "node:path";
import { taggedPeopleSchema } from "./schemas/tagged-people-schema";
import { fileURLToPath } from "node:url";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { sendResult } from "../common/send-result";
import { startActiveObservation } from "@langfuse/tracing";

export const peopleRouter = Router();
const MODEL = "claude-sonnet-4-6";

peopleRouter.get("/", (_req, res) => {
  const response: ApiResponse<string> = {
    success: true,
    data: "People task endpoint",
  };
  res.json(response);
});
peopleRouter.get("/tag-jobs", async (_req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const people = filterByCriteria(peopleCsvParser());
  const systemPrompt = fs.readFileSync(
    path.join(__dirname, "prompts/tag-jobs.md"),
    "utf8",
  );
  const response = await startActiveObservation("tag-jobs", async (span) => {
    try {
      const result = await aiClient.messages.parse({
        model: MODEL,
        max_tokens: 10000,
        system: systemPrompt,
        messages: [{ role: "user", content: JSON.stringify(people) }],
        output_config: { format: zodOutputFormat(taggedPeopleSchema) },
      });
      span.update({
        input: { system: systemPrompt, user: JSON.stringify(people) },
        output: result.parsed_output,
        metadata: {
          model: MODEL,
          tokens: result.usage,
          tags: ["people", "classification"],
        },
      });
      return result.parsed_output;
    } catch (error) {
      throw error;
    }
  });

  if (response === null) {
    return res.status(400).json({ error: "No response from AI" });
  }
  const taggedPeople = filterByTransportTag(response);

  console.log("RESPONSE", taggedPeople);
  const result = await sendResult("people", taggedPeople);
  res.json(result);
});
