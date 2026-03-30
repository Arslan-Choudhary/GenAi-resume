import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const env = process.env;

const ENV = {
  DB: {
    MONGODB_URI: env.MONGODB_URI,
    DB_NAME: env.DB_NAME,
  },
  port: env.PORT,
  CORS: env.CORS_ORIGIN,
  JWT_SECRET: env.JWT_SECRET,
  expiresIn: env.expiresIn,
  GOOGLE_GENAI_API_KEY: env.GOOGLE_GENAI_API_KEY
};

export default ENV;
