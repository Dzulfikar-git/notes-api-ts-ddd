const appConfig = {
  isProduction: process.env.NODE_ENV === "production",
  port: process.env.NODE_PORT || 5000,
};

export { appConfig };
