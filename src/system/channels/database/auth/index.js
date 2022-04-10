const { ipcMain } = require("electron");
const bcrypt = require("bcrypt");
const { getConnection } = require("../../../helpers/call-helper");

ipcMain.handle(
  "auth.login",
  async (event, [objectConnection = {}, { username, password }]) => {
    try {
      const userTableName = "users";
      let conn = getConnection(objectConnection);

      const user = await conn
        .table(userTableName)
        .where("username", username)
        .first();

      await conn.destroy();

      let hasAuthenticate = false;
      if (user) {
        user.password = user.password.replace("$2y$", "$2a$");
        hasAuthenticate = await bcrypt.compare(password, user.password);
      }

      return {
        has_authenticate: hasAuthenticate,
        access_token: password,
        user: hasAuthenticate ? user : null,
      };
    } catch (error) {
      throw error;
    }
  }
);
