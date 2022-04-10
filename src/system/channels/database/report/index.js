const { ipcMain } = require("electron");
const { knex } = require("knex");
const moment = require("moment");
const { getConnection } = require("../../../helpers/call-helper");

ipcMain.handle(
  "sync.reports",
  async (
    event,
    [
      objectConnection = {},
      arraySyncData = [],
      actionParams = { isFreshDataTable: false },
    ]
  ) => {
    try {
      const applicationsTableName = "applications";
      const productsTableName = "products";
      const shiftsTableName = "shifts";
      const reportsTableName = "reports";
      const conn = getConnection(objectConnection);

      if (actionParams?.isFreshDataTable) {
        await conn.table(reportsTableName).delete();
      }

      for (let {
        id,
        machine_number,
        gross,
        tare,
        netto,
        judgement,
        user_id,
        product_id,
        product,
        application,
        application_id,
        shift_id,
        shift,
        user,
        created_at,
        updated_at,
      } of arraySyncData) {
        await conn
          .table(applicationsTableName)
          .insert({
            ...application,
            created_at: moment(application.created_at).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            updated_at: moment(application.updated_at).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          })
          .onConflict("id")
          .merge();

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

        // delete email because not use email from local database
        delete user.email;
        delete user.email_verified_at;
        await conn
          .table("users")
          .insert({
            ...user,
            created_at: moment(user.created_at).format("YYYY-MM-DD HH:mm:ss"),
            updated_at: moment(user.updated_at).format("YYYY-MM-DD HH:mm:ss"),
          })
          .onConflict("id")
          .merge();

        await conn
          .table(reportsTableName)
          .insert({
            id,
            machine_number,
            gross,
            tare,
            netto,
            judgement,
            application_id,
            user_id,
            product_id,
            shift_id,
            is_syncronized: true,
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
  "create_update.reports",
  async (event, [objectConnection = {}, arraySyncData = []]) => {
    try {
      const reportsTableName = "reports";
      const conn = getConnection(objectConnection);

      for (let {
        id,
        machine_number,
        gross,
        tare,
        netto,
        judgement,
        user_id,
        product_id,
        application_id,
        shift_id,
        is_syncronized,
        created_at,
        updated_at,
      } of arraySyncData) {
        is_syncronized = is_syncronized ?? false;

        await conn
          .table(reportsTableName)
          .insert({
            id,
            machine_number,
            gross,
            tare,
            netto,
            judgement,
            application_id,
            user_id,
            product_id,
            shift_id,
            is_syncronized,
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
  "get.reports",
  async (
    event,
    [
      objectConnection = {},
      queryFilter = {
        per_page: 10,
        page: 1,
        all: false,
        order: ["created_at", "desc"],
        is_syncronized: null,
        machine_number: null,
        product_id: null,
        user_id: null,
        shift_id: null,
        from: null,
        to: null,
      },
    ]
  ) => {
    try {
      const tableProductShift = "reports";
      const conn = getConnection(objectConnection);
      const isAll = queryFilter.all ?? false;
      const per_page = queryFilter.per_page ?? 10;
      const page = queryFilter.page ?? 1;
      const order = queryFilter.order ?? ["created_at", "desc"];

      const is_syncronized = queryFilter.is_syncronized ?? null;

      const from = queryFilter.from ?? null;
      const to = queryFilter.to ?? null;
      const machine_number = queryFilter.machine_number ?? null;
      const product_id = queryFilter.product_id ?? null;
      const user_id = queryFilter.user_id ?? null;
      const shift_id = queryFilter.shift_id ?? null;

      // get total for all data in database
      const [{ total }] = await conn
        .table(tableProductShift)
        .count("id as total");

      let data = conn
        .table(tableProductShift)
        .select(
          "reports.id",
          "reports.machine_number",
          "reports.gross",
          "reports.tare",
          "reports.netto",
          "reports.judgement",
          "reports.user_id",
          "reports.product_id",
          "reports.shift_id",
          "reports.application_id",
          "reports.created_at",
          "reports.updated_at",
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
          "shifts.updated_at as shift__updated_at",
          "users.id as user__id",
          "users.name as user__name",
          "users.username as user__username",
          "users.password as user__password",
          "users.created_at as user__created_at",
          "users.updated_at as user__updated_at",
          "applications.id as application__id",
          "applications.name as application__name",
          "applications.created_at as application__created_at",
          "applications.updated_at as application__updated_at"
        )
        .innerJoin(
          "products",
          conn.ref("products.id"),
          conn.ref("reports.product_id")
        )
        .innerJoin(
          "shifts",
          conn.ref("shifts.id"),
          conn.ref("reports.shift_id")
        )
        .innerJoin("users", conn.ref("users.id"), conn.ref("reports.user_id"))
        .innerJoin(
          "applications",
          conn.ref("applications.id"),
          conn.ref("reports.application_id")
        );

      // filter report
      if (from) {
        data = data.where("reports.created_at", ">=", from);
      }
      if (to) {
        data = data.where("reports.created_at", "<=", to);
      }
      if (machine_number) {
        data = data.where(
          "reports.machine_number",
          "like",
          `%${machine_number}%`
        );
      }
      if (product_id) {
        data = data.where("reports.product_id", product_id);
      }
      if (shift_id) {
        data = data.where("reports.shift_id", shift_id);
      }
      if (user_id) {
        data = data.where("reports.user_id", user_id);
      }

      // get for not yet sync
      if (queryFilter.is_syncronized != null) {
        data = data.where("reports.is_syncronized", queryFilter.is_syncronized);
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
