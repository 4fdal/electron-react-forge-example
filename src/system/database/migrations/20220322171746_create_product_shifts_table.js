/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = ({ schema }) => {
  return schema.createTable("product_shifts", table => {
    table.increments("id").unsigned().primary();
    table.bigInteger("product_id").unsigned().nullable();
    table.bigInteger("shift_id").unsigned().nullable();
    table.dateTime("created_at").nullable();
    table.dateTime("updated_at").nullable();

    table
      .foreign("shift_id")
      .references("id")
      .inTable("shifts")
      .onDelete("null");

    table
      .foreign("product_id")
      .references("id")
      .inTable("products")
      .onDelete("null");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = ({ schema }) => {
  return schema.dropTableIfExists("product_shifts");
};
