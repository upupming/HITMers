const config = require('../config');
// Connect to database
const knex = require('knex')(config.db);