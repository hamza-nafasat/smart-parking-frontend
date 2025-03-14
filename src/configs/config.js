const config = Object.freeze({
  SERVER_URL: import.meta.env.VITE_SERVER_URL,
  DOMAIN: import.meta.env.VITE_DOMAIN,
  ENVIRONMENT: import.meta.env.VITE_ENV,
  STRIPE_PUBLISH_KEY: import.meta.env.VITE_STRIPE_PUBLISH_KEY,
});

const getEnv = (key) => {
  const value = config[key];
  if (!value) throw new Error(`Config ${key} not found`);
  return value;
};

export default getEnv;
