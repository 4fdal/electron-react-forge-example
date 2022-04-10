import { MeRequest } from "..";
import {
  getApiV1BasePath,
  getConnectionDatabase,
  objectToQueryString,
} from "../../helpers/call-helper";
import { rendererInvoke } from "../../ipc-renderer";

export default class RequestProduct {
  static getProducts(objectQueryString, isSync = false) {
    return MeRequest.get(
      getApiV1BasePath("/product?" + objectToQueryString(objectQueryString))
    )
      .then(async ({ data: { data } }) => {
        try {
          let isFreshDataTable = false;
          let arraySyncData = data.data;

          if (isSync) {
            try {
              const {
                data: {
                  data: { data: newArraySyncData },
                },
              } = await MeRequest.get(
                getApiV1BasePath(
                  "/product?" + objectToQueryString({ all: true })
                )
              );

              arraySyncData = newArraySyncData;
              isFreshDataTable = true;
            } catch (error) {}
          }

          await rendererInvoke(
            "sync.products",
            getConnectionDatabase(),
            arraySyncData,
            { isFreshDataTable }
          );
        } catch (error) {}

        return data;
      })
      .catch(async err => {
        // if failed to connect server, get data from local database
        if ([404, 500, undefined].includes(err?.response?.status)) {
          try {
            let data = await rendererInvoke(
              "get.products",
              getConnectionDatabase(),
              objectQueryString
            );

            return Promise.resolve(data);
          } catch (error) {}
        }

        throw err;
      });
  }
}
