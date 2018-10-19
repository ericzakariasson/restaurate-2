const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorAliases: Sequelize.Op
  }
)

const models = {
  User: sequelize.import('./User'),
  Visit: sequelize.import('./Visit'),
}

Object.keys(models).forEach(key => {
  if (models[key].associate) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  models
};