export const appConfig = {
  appName: "PulsePlay",
  apiBaseUrl: process.env.API_BASE_URL ?? "http://localhost:3001/api",
  environment: process.env.NODE_ENV ?? "development"
} as const;
