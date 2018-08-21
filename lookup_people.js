const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user    : settings.user,
  password: settings.password,
  database: settings.database,
  host    : settings.hostname,
  port    : settings.port,
  ssl     : settings.ssl
});

const firstName = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");
  client.query("SELECT * FROM famous_people WHERE $1::text = first_name", [firstName], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
    client.end();
  });
});
