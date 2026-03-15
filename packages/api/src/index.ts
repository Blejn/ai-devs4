import express from "express";
import cors from "cors";
import { env } from "./common/config.js";
import { peopleRouter } from "./people/people.routes.js";
import sdk from "./common/monitoring/instrumentation.js";

const app = express();
sdk.start();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/people", peopleRouter);

app.listen(env.PORT, () => {
  console.log(`API running on http://localhost:${env.PORT}`);
});

process.on("SIGTERM", async () => {
  await sdk.shutdown();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await sdk.shutdown();
  process.exit(0);
});
