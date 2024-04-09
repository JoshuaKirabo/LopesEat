// Connecting to my postgres DB
const { Pool } = require('pg');

const pool = new Pool({
  user: 'joshuakirabo',
  host: '172.25.67.255',
  database: 'lopeseat',
  password: 'northward',
  port: 5432, // Default port for PostgreSQL
});

module.exports = pool;
