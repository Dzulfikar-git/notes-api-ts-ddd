import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_NAME, NODE_ENV } = process.env;

const mongoDbConnection: { [string: string]: { uri: string; config: mongoose.ConnectOptions } } = {
  development: {
    uri: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}_dev`,
    config: {
      ssl: false,
      authSource: 'admin',
    },
  },
  test: {
    uri: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}_test`,
    config: {
      ssl: false,
      authSource: 'admin',
    },
  },
  production: {
    uri: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`,
    config: {
      ssl: true,
      authSource: 'admin',
    },
  },
};

const { uri, config } = mongoDbConnection[NODE_ENV];

export { uri, config };
