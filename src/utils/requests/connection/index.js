import { MeRequest } from "..";
import { rendererInvokeRequest } from "../../ipc-renderer";

export default class RequestConnection {
  static test({ host, port }) {
    // return rendererInvokeRequest({
    //   url: `${host}:${port}/api/v1/test`,
    //   method: 'post',
    // }).then(({ data }) => {
    //   return data
    // });

    return Promise.resolve(true)
  }
}
