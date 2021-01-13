/* eslint-disable no-underscore-dangle */
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// create filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// direct the dotenv config to .env file inside config folder
dotenv.config({ path: `${__dirname}/.env` });

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SIGNIN_KEY: process.env.JWT_SIGNIN_KEY,
};

export default config;
