const settings = require("./settings");
var knex = require("knex") ({
  client: 'pg',
  connection: {
    database: settings.database,
    user    : settings.user,
    password: settings.password,
    host    : settings.hostname,
    port    : settings.port
  }
});

const inFromConsole = process.argv.slice(2);
const firstName = inFromConsole[0];
const lastName = inFromConsole[1];
const birthdate = inFromConsole[2];

knex('famous_people')
  .insert({first_name : firstName, last_name : lastName, birthdate : birthdate})
  .returning('*')
  .asCallback(function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Added " + firstName, lastName + " to Database.");
    knex.destroy();
  });
