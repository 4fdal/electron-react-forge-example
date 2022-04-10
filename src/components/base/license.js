import React from "react";
import RequestLicense from "../../utils/requests/license";

export default class License extends React.Component {
  static defaultProps = {
    router: {
      location: {},
      params: {},
      navigate: (to, options) => {},
    },
  };

  componentDidMount = () => {
    // check license
    RequestLicense.check(this.props.router);
  };

  render = () => {
    return <></>;
  };
}
