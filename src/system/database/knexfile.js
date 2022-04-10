// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: require(__dirname + '/../../../node_modules/knex/lib/dialects/mysql2'),
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "mayora",
    charset: "utf8",
  },
  migrations: {
    tableName: "migrations",
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
