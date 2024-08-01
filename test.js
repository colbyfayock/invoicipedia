require('dotenv').config({
  path: './.env.local'
});

const { Client } = require('pg');

if ( !process.env.DATABASE_URL ) {
  throw new Error('DATABASE_URL must be a Xata postgres connection string')
}

(async function run() {
  // Test query for simply showing configuration works before drizzle video

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();

  const result = await client.query('SELECT current_database()');

  console.log('result', result.rows)
  
  await client.end()
})();