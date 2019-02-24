import config from "../config.json";

export const api =
  process.env.NODE_ENV === "production" ? config.API_PROD : config.API_DEV;
