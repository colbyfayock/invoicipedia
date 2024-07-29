require('dotenv').config({
  path: './.env.local'
});

// Figure out how to do this without copying in entire client

// const { getXataClient } = require("./src/db/xata");
const { buildClient } = require('@xata.io/client');
const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Test-Invoices-u67f31.us-east-1.xata.sh/db/test-invoices",
};

const tables = [];

class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance = undefined;

const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};

const xata = getXataClient();

if ( !process.env.DATABASE_URL ) {
  throw new Error('DATABASE_URL must be a Xata postgres connection string')
}

// const sql = xata(process.env.DATABASE_URL).;

(async function run() {
  // Test query for simply showing configuration works before drizzle video
  const result = await xata.sql`SELECT current_database()`;
  console.log('result', result)
})()



// const { drizzle } = require("@xata.io/drizzle");
// const { eq } = require("drizzle-orm");
// const { pgTable } = require("drizzle-orm/pg-core");
// // Generated with CLI


// const tableName = pgTable("tableName", {
//   xata_id: text("xata_id").primaryKey(),
// });

// const db = drizzle(xata);

// const record = await db
//   .select()
//   .from(tableName)
//   .where(eq(tableName.xata_id, "rec_xyz"))
//   .execute();
// console.log(record);