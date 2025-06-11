import axios from "axios";
import type { FootprintResult } from "../utils/calculateFootprint";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const registerAPI = (email: string, password: string) =>
  API.post("/auth/register", { email, password });

export const loginAPI = (email: string, password: string) =>
  API.post("/auth/login", { email, password });

export const getHistory = (token: string) =>
  API.get("/footprints", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const saveFootprint = (data: object, result: FootprintResult, token: string) =>
API.post("/footprints", { data, result }, {
  headers: { Authorization: `Bearer ${token}` },
});
