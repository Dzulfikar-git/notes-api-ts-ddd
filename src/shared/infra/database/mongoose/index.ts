import mongoose from 'mongoose';
import { config, uri } from './config/config';

(async function () {
  try {
    await mongoose.connect(uri, config);
    console.log('[DB]: Connected to mongo database.');
  } catch (error) {
    console.log(`[DB]: Error connecting to mongo database. ${error}`);
  }
})();
