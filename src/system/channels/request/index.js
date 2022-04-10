const { default: axios } = require("axios");
const { ipcMain } = require("electron");

ipcMain.handle("request", async (event, [configure]) => {

    try {
        const { data } = await axios(configure)

        return data
    } catch (error) {
        throw error
    }
});
