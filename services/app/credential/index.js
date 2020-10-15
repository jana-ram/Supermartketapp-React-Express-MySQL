const config = require('./config.json');
const environment = process.env.NODE_ENV || 'development';
CONFIG = config[environment];