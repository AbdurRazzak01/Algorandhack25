// backend/lib/algo.ts
import algosdk from "algosdk";

export const client = new algosdk.Algodv2(
  process.env.ALGOD_TOKEN || "",
  process.env.ALGOD_URL || "",
  process.env.ALGOD_TOKEN ? { "X-API-Key": process.env.ALGOD_TOKEN } : {}
);
