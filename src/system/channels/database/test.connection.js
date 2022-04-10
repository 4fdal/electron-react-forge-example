const { ipcMain } = require("electron");
const { knex } = require("knex");

ipcMain.handle("database.test.connection", async (event, args) => {
  const { host, port, user, password, database } = args[0];

  let conn = knex({
    client: "mysql2",
    connection: {
      host,
      port,
      user,
      password,
      database,
    },
  }).raw(`select true`);

  return conn;
});
