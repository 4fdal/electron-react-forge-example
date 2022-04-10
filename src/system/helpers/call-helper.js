const { knex } = require("knex");

function getConnection({ host, port, user, password, database }) {
  let conn = knex({
    client: "mysql2",
    connection: {
      host,
      port,
      user,
      password,
      database,
    },
  });

  return conn;
}

module.exports = {
  getConnection,
};