async function requestGetScalesExample() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({});
    }, 100);
  });
}

export default class RequestScales {
  static getScales() {
    return requestGetScalesExample().then(response => {
      let data = response?.data?.data ?? {
        netto: 123.45,
        tare: 123.45,
        gross: 123.45,
      };
      // todo replace data...

      return data;
    });
  }
}
