import { env } from "./config";
import { TaskResultRequest } from "./types";
const TASK_RESOLVE_URL = "https://hub.ag3nts.org/verify";

export const sendResult = async <T>(taskName: string, result: T) => {
  const requestBody: TaskResultRequest = {
    apikey: env.AI_DEV_API_KEY,
    task: taskName,
    answer: result,
  };
  const response = await fetch(TASK_RESOLVE_URL, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
