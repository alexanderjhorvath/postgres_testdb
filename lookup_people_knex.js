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

const firstName = process.argv[2];

knex.select('*').from("famous_people")
  .where('first_name', '=', firstName)
  .asCallback(function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Found " + result.length + " person(s) by the name " + firstName);
    resultsLogger(result);
  });


function resultsLogger(results) {
  var num = 1;
  results.forEach(function(item) {
    console.log("- " + num + ": " + item.first_name, item.last_name + ", born " + "\'" + item.birthdate.toLocaleDateString() + "\'");
    num++;
  });
};
