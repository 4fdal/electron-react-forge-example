const { ipcMain } = require("electron");
const { knex } = require("knex");
const moment = require("moment");
const { getConnection } = require("../../../helpers/call-helper");

ipcMain.handle(
  "sync.product_shifts",
  async (
    event,
    [
      objectConnection = {},
      arraySyncDataProductShifts = [],
      actionParams = { isFreshDataTable: false },
      ,
    ]
  ) => {
    try {
      const productsTableName = "products";
      const shiftsTableName = "shifts";
      const productShiftsTableName = "product_shifts";
      let conn = getConnection(objectConnection);

      if (actionParams?.isFreshDataTable) {
        await conn.table(productsTableName).delete();
      }

      for (let {
        id,
        product_id,
        product,
        shift_id,
        shift,
        created_at,
        updated_at,
      } of arraySyncDataProductShifts) {
        await conn
          .table(productsTableName)
          .insert({
            ...product,
            created_at: moment(product.created_at).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            updated_at: moment(product.updated_at).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          })
          .onConflict("id")
          .merge();

        await conn
          .table(shiftsTableName)
          .insert({
            ...shift,
            created_at: moment(shift.created_at).format("YYYY-MM-DD HH:mm:ss"),
            updated_at: moment(shift.updated_at).format("YYYY-MM-DD HH:mm:ss"),
          })
          .onConflict("id")
          .merge();

        await conn
          .table(productShiftsTableName)
          .insert({
            id,
            product_id,
            shift_id,
            created_at: moment(created_at).format("YYYY-MM-DD HH:mm:ss"),
            updated_at: moment(updated_at).format("YYYY-MM-DD HH:mm:ss"),
          })
          .onConflict("id")
          .merge();
      }

      await conn.destroy();
    } catch (error) {
      throw error;
    }
  }
);

ipcMain.handle(
  "get.product_shifts",
  async (
    event,
    [
      objectConnection = {},
      queryFilter = {
        per_page: 10,
        page: 1,
        all: false,
        order: ["created_at", "desc"],
        shift_id: null,
        name: null,
      },
    ]
  ) => {
    try {
      const tableProductShift = "product_shifts";
      const conn = getConnection(objectConnection);
      const isAll = queryFilter.all ?? false;
      const per_page = queryFilter.per_page ?? 10;
      const page = queryFilter.page ?? 1;
      const order = queryFilter.order ?? ["created_at", "desc"];
      const shift_id = queryFilter.shift_id ?? null;
      const name = queryFilter.name ?? null;

      let data = conn
        .table(tableProductShift)
        .select(
          "product_shifts.id",
          "product_shifts.product_id",
          "product_shifts.shift_id",
          "product_shifts.created_at",
          "product_shifts.updated_at",
          "products.id as product__id",
          "products.heavy as product__heavy",
          "products.name as product__name",
          "products.max_tolerance as product__max_tolerance",
          "products.min_tolerance as product__min_tolerance",
          "products.created_at as product__created_at",
          "products.updated_at as product__updated_at",
          "shifts.id as shift__id",
          "shifts.name as shift__name",
          "shifts.start_time as shift__start_time",
          "shifts.end_time as shift__end_time",
          "shifts.created_at as shift__created_at",
          "shifts.updated_at as shift__updated_at"
        )
        .innerJoin(
          "products",
          conn.ref("products.id"),
          conn.ref("product_shifts.product_id")
        )
        .innerJoin(
          "shifts",
          conn.ref("shifts.id"),
          conn.ref("product_shifts.shift_id")
        );

      if (shift_id) {
        data = data.where("shifts.id", shift_id);
      }

      if (name) {
        data = data.where("products.name", "like", `%${name}%`);
      }

      // get data page and per page
      if (per_page && page && !isAll) {
        data = data.limit(per_page).offset((page - 1) * per_page);
      }

      // order created at desc
      data = data.orderBy(order[0], order[1]);

      data = (await data).map(item => {
        let newItem = {};
        for (const key in item) {
          let valueItem = item[key];
          let splitKeyItem = key.split("__");

          if (splitKeyItem.length > 1) {
            const [relationName, relationKey] = splitKeyItem;
            if (!newItem[relationName]) newItem[relationName] = {};
            newItem[relationName][relationKey] = valueItem;
          } else {
            newItem[key] = valueItem;
          }
        }

        return newItem;
      });

      // get total for all data in database
      let total = conn.table(tableProductShift);
      if (shift_id) {
        total = total.where("shift_id", shift_id);
      }
      total = (await total.count("id as total"))[0].total;

      await conn.destroy();

      return {
        data,
        per_page,
        current_page: page,
        total,
      };
    } catch (error) {
      throw error;
    }
  }
);
