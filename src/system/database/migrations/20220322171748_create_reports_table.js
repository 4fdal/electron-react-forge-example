/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = ({ schema }) => {
  return schema.createTable("reports", table => {
    table.bigIncrements("id").unsigned().primary();
    table.string("machine_number").nullable();
    table.double("gross").nullable();
    table.double("tare").nullable();
    table.double("netto").nullable();
    table.string("judgement").nullable();
    table.bigInteger("application_id").unsigned().nullable();
    table.bigInteger("product_id").unsigned().nullable();
    table.bigInteger("shift_id").unsigned().nullable();
    table.bigInteger("user_id").unsigned().nullable();
    table.boolean("is_syncronized").nullable();
    table.dateTime("created_at").nullable();
    table.dateTime("updated_at").nullable();

    table
      .foreign("product_id")
      .references("id")
      .inTable("products")
      .onDelete("null");
    table
      .foreign("application_id")
      .references("id")
      .inTable("applications")
      .onDelete("null");
    table
      .foreign("shift_id")
      .references("id")
      .inTable("shifts")
      .onDelete("null");
    table.foreign("user_id").references("id").inTable("users").onDelete("null");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = ({ schema }) => {
  return schema.dropTableIfExists("reports");
};
