import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});

export const registerAPI = (email: string, password: string) =>
  API.post("/auth/register", { email, password });

export const loginAPI = (email: string, password: string) =>
  API.post("/auth/login", { email, password });