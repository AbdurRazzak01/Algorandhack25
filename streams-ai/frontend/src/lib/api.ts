import axios from "axios";
export const API_BASE = import.meta.env.VITE_AGENT_API as string;
export const api = axios.create({ baseURL: API_BASE, timeout: 15000 });
