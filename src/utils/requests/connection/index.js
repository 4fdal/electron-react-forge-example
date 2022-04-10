import { MeRequest } from "..";

export default class RequestConnection {
  static test({ host, port }) {
    return MeRequest.post(`${host}:${port}/api/v1/test`).then(
      ({ data: { data } }) => data
    );
  }
}
