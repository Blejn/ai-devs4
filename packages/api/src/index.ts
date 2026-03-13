import express from "express";
import cors from "cors";
import { env } from "./config.js";
import { tasksRouter } from "./routes/tasks.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tasks", tasksRouter);

app.listen(env.PORT, () => {
  console.log(`API running on http://localhost:${env.PORT}`);
});
