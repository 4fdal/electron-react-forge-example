import React from "react";
import { ToastContainer } from "react-toastify";
import AppContext from "./contexts/app-context";
import Routers from "./router/index";

import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/base/loader";

class App extends React.Component {
  state = {
    isLoader: false,
  };

  // set loaded with context
  setLoader = (isLoader = true) => this.setState({ isLoader });

  // get status loaded with context
  getLoader = () => this.state.isLoader;

  render = () => {
    return (
      <AppContext.Provider value={this}>
        <Loader open={this.getLoader()} />
        <ToastContainer />
        <Routers />
      </AppContext.Provider>
    );
  };
}

export default App;
