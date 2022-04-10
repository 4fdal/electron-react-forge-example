const { contextBridge, ipcRenderer } = require('electron');

try {
    contextBridge.exposeInMainWorld('electron', {
        ipcRendererInvoke: ipcRenderer.invoke,
    });
} catch (error) {
    console.error(error)
}

