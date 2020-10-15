require('../credential/index');
module.exports = {
  HOST: CONFIG['DB_HOST'],
  USER: CONFIG['DB_USERNAME'],
  PASSWORD: CONFIG['DB_PASSWORD'],
  DB: CONFIG['DATABASE'],
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
