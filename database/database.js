require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: 'sdc',
  host: '172.31.23.189',
  database: 'sdc',
});

pool.on('error', (err, client) => {
  console.error('Error: ', err);
});

module.exports = {
  pool,
};