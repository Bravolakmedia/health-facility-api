const Sequelize = require('sequelize');
const sequelize = new Sequelize(/* your database config */);

const User = require('./User');

const models = {
  User,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
