const { ipcMain } = require("electron");

const db = require("../../database/connection");

ipcMain.handle("example.channel", (event, args) => {
  return "hello.world.example.channel : " + JSON.stringify(args);
});
