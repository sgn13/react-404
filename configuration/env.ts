import * as dotenv from "dotenv";
import { IEnv } from "./env.types";

dotenv.config();

const ROOT = process.cwd();
let path: string;

type NodeEnvType = "development" | "testing" | "staging" | "production";

const processEnvironment = process.env.NODE_ENV as NodeEnvType;

switch (processEnvironment) {
  case "production":
    path = `${ROOT}/.env/production.env`;
    break;
  case "staging":
    path = `${ROOT}/.env/staging.env`;
    break;
  case "testing":
    path = `${ROOT}/.env/testing.env`;
    break;
  default:
    path = `${ROOT}/.env/development.env`;
}

// Load content from .env file to process.env
dotenv.config({ path });

const {
  NODE_ENV = "development",

  APP_NAME = "",
  APP_HOST = "",
  APP_URL = "",
  PORT = 3000,
  APP_PREFIX = "",

  API_NAME = "",
  API_HOST = "",
  API_URL = "",
  API_PORT = 8000,
  API_PREFIX = "",

  WS_URL = "",
} = process.env;

export const env: IEnv = {
  root: ROOT,
  env: {
    name: NODE_ENV || "",
    isDevelopment: processEnvironment === "development",
    isTesting: processEnvironment === "testing",
    isStaging: processEnvironment === "staging",
    isProduction: processEnvironment === "production",
  },
  app: {
    name: APP_NAME,
    host: APP_HOST,
    url: APP_URL,
    port: Number(PORT),
    prefix: APP_PREFIX,
  },
  api: {
    name: API_NAME,
    host: API_HOST,
    url: API_URL,
    port: Number(API_PORT),
    prefix: API_PREFIX,
  },
  ws: {
    url: WS_URL,
  },
};

export default env;
