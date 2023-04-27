"use client";
import axios from "axios";

let Api = axios.create({
  baseURL: "http://localhost:8050/api",
});

export default Api;
