export interface IEnv {
  root: string;
  env: {
    name: string;
    isDevelopment: boolean;
    isStaging: boolean;
    isTesting: boolean;
    isProduction: boolean;
  };
  app: {
    name: string;
    host: string;
    url: string;
    port: number;
    prefix: string;
  };
  api: {
    name: string;
    host: string;
    url: string;
    port: number;
    prefix: string;
  };
  ws: { url: string };
}
