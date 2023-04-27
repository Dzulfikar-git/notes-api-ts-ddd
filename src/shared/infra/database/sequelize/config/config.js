require('dotenv').config()
import Sequelize from 'sequelize';

const { 
    SQL_DB_HOST,
    SQL_DB_PORT,
    SQL_DB_USER,
    SQL_DB_PASSWORD,
    SQL_DB_NAME,
    NODE_ENV,
} = process.env;

const databaseCredentials = {
  "development": {
    "username": SQL_DB_USER,
    "password": SQL_DB_PASSWORD,
    "database": `${SQL_DB_NAME}_dev}`,
    "host": SQL_DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": SQL_DB_USER,
    "password": SQL_DB_PASSWORD,
    "database": `${SQL_DB_NAME}_test}`,
    "host": SQL_DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": SQL_DB_USER,
    "password": SQL_DB_PASSWORD,
    "database": SQL_DB_NAME,
    "host": SQL_DB_HOST,
    "dialect": "mysql"
  }
};

const { 
  username, password, database, host, dialect 
} = databaseCredentials[NODE_ENV];

export default databaseCredentials;

const mode = NODE_ENV === "production" ? 'prod' : 'dev';

console.log(`[DB]: Connecting to the database in ${mode} mode.`)

export const connection = new Sequelize(database, username, password, {
    host,
    dialect,
    port: SQL_DB_PORT,
    dialectOptions: {
      multipleStatements: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  }
);