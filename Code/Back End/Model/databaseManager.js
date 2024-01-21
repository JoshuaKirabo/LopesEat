// Connecting to my postgres DB
const { Pool } = require('pg');

const pool = new Pool({
  user: 'joshuakirabo',
  host: 'localhost',
  database: 'lopeseat',
  password: 'c5q055GX0ZU%',
  port: 5432, // Default port for PostgreSQL
});

module.exports = pool;
