// const { ipcRenderer } = require('electron')

/**
 *
 *
 * @export
 * @param {string} channel
 * @param {any[]} args
 * @return {Promise<any>}
 * @example
 * rendererInvoke("example.channel")
 * .then(response => {})
 * .catch(err => {})
 */
export function rendererInvoke(channel, ...args) {
  // return ipcRenderer.invoke(channel, args);

  return Promise.resolve(true)
}