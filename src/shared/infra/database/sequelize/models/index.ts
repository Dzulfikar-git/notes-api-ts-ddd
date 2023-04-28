import fs from 'fs';
import path from 'path';
import config from '../config/config';

const addModels = () => {
  const sequelize = config.sequelize;
  // Add all models
  fs.readdirSync(path.resolve(__dirname, './'))
    .filter((t) => (~t.indexOf('.ts') || ~t.indexOf('.js')) && !~t.indexOf('index') && !~t.indexOf('.map'))
    .map((model) => sequelize.addModels([__dirname + '/' + model]));

  return sequelize.models;
};

export default addModels();

export { addModels };
