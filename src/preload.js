const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ipcRendererInvoke: ipcRenderer.invoke,
});
