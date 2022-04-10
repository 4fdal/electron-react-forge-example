const { ipcMain } = require("electron");
const moment = require("moment");
const { getConnection } = require("../../../helpers/call-helper");

ipcMain.handle(
  "sync.applications",
  async (
    event,
    [
      objectConnection = {},
      arraySyncData = [],
      actionParams = { isFreshDataTable: false },
    ]
  ) => {
    try {
      const applicationTableName = "applications";
      let conn = getConnection(objectConnection);

      if (actionParams?.isFreshDataTable) {
        await conn.table(applicationTableName).delete();
      }

      for (let { id, name, created_at, updated_at } of arraySyncData) {
        await conn
          .table(applicationTableName)
          .insert({
            id,
            name,
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
  "get.applications",
  async (
    event,
    [
      objectConnection = {},
      queryFilter = {
        per_page: 10,
        page: 1,
        all: false,
        order: ["created_at", "desc"],
      },
    ]
  ) => {
    try {
      const applicationsTableName = "applications";
      const conn = getConnection(objectConnection);
      const isAll = queryFilter.all ?? false;
      const per_page = queryFilter.per_page ?? 10;
      const page = queryFilter.page ?? 1;
      const order = queryFilter.order ?? ["created_at", "desc"];

      // get total for all data in database
      const [{ total }] = await conn
        .table(applicationsTableName)
        .count("id as total");

      let data = conn
        .table(applicationsTableName)
        .select(
          "applications.id",
          "applications.name",
          "applications.created_at",
          "applications.updated_at"
        );

      // get data page and per page
      if (per_page && page && !isAll) {
        data = data.limit(per_page).offset((page - 1) * per_page);
      }

      // order created at desc
      data = data.orderBy(order[0], order[1]);

      data = await data;

      await conn.destroy();

      return {
        data,
        per_page: per_page,
        current_page: page,
        total,
      };
    } catch (error) {
      throw error;
    }
  }
);
