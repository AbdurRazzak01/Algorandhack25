// backend/server.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gptRouter from "./routes/gpt";
import paymentRouter from "./routes/payment";
import streamRouter from "./routes/stream";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("✅ StreamSmart.AI Backend Running"));
app.use("/gpt", gptRouter);
app.use("/payment", paymentRouter);
app.use("/stream", streamRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
