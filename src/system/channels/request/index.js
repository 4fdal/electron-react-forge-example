const { default: axios } = require("axios");
const { ipcMain } = require("electron");

ipcMain.handle("request", async (event, [config]) => {
  try {
    const { data } = await axios(config);
    return Promise.resolve(data);
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      return Promise.reject({
        status,
        data,
      });
    }

    return Promise.reject({
      status: -1,
      data: {
        message: error.message,
        data: null,
        error: error.message,
      },
      config,
    });
  }
});
