import { Router } from "express";
import type { ApiResponse } from "@ai-devs/shared";

export const tasksRouter = Router();

tasksRouter.get("/", (_req, res) => {
  const response: ApiResponse<string[]> = {
    success: true,
    data: ["Tutaj będą zadania z AI Devs 4"],
  };
  res.json(response);
});
