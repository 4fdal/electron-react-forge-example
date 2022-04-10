/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("settings").del();
  await knex("settings").insert([
    // applications settings
    { key: "id_application", value: "VH746JS90" },

    // database settings
    { key: "ip_database", value: "127.0.0.1" },
    { key: "port_database", value: "3306" },
    { key: "user_database", value: "home" },
    { key: "password_database", value: "secret" },
    { key: "name_database", value: "mayora" },

    // server settings
    { key: "host_server", value: "http://localhost:8000" },
    { key: "port_server", value: "8000" },

    // scale settings
    { key: "baudrate", value: "31" },
    { key: "databits", value: "231" },
    { key: "parity", value: "95" },
    { key: "port", value: "3300" },
    { key: "delimiter", value: "120" },
    { key: "start_value_substring", value: "12" },
    { key: "length_value_substring", value: "90" },
    { key: "start_unit_substring", value: "56" },
    { key: "length_unit_substring", value: "100" },
  ]);
};
