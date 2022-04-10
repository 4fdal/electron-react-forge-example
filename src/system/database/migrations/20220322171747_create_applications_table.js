/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = ({ schema }) => {
  return schema.createTable("applications", table => {
    table.bigIncrements("id").unsigned().primary();
    table.string("name").nullable();
    table.dateTime("created_at").nullable();
    table.dateTime("updated_at").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = ({ schema }) => {
  return schema.dropTableIfExists("applications");
};
