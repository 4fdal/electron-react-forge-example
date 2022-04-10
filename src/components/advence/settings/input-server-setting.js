import { Button, Grid, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { meToast, onChangeHandle } from "../../../utils/helpers/call-helper";
import RequestConnection from "../../../utils/requests/connection";
import SettingsStorage from "../../../utils/storages/settings-storage";

export default class InputServerSetting extends React.Component {
  state = {
    host_server: "",
    port_server: "",
  };

  componentDidMount = () => {
    // get setting from local storage and set state
    let { host_server, port_server } = SettingsStorage.getSettingServer();
    this.setState({
      host_server,
      port_server,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.checkServerConnection().then(connectionStatus => {
      if (connectionStatus) {
        SettingsStorage.setSettingServer({
          host_server: this.state.host_server,
          port_server: this.state.port_server,
        });
        meToast("success", "Berhasil mengupdate setting server");
      }
    });
  };

  checkServerConnection = () => {
    const { host_server: host, port_server: port } = this.state;
    return RequestConnection.test({
      host,
      port,
    }).catch(err => {
      meToast("error", "Koneksi ke server gagal");
    });
  };

  onClickSaveButton = () => {
    this.setState({
      host_server: this.state.host_server.trim(),
      port_server: this.state.port_server.trim(),
    });
  };

  onClickTestConnectionButton = () => {
    this.checkServerConnection().then(connectionStatus => {
      if (connectionStatus) {
        meToast("success", "Koneksi ke server berhasil");
      } else {
        meToast("error", "Koneksi ke server gagal");
      }
    });
  };

  render = () => {
    return (
      <Grid
        component={"form"}
        onSubmit={this.onSubmit}
        flexDirection={"column"}
        container
        spacing={2}
      >
        <Grid item>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "host_server")}
            value={this.state.host_server}
            type="text"
            id="outlined-basic"
            label="Host Server"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "port_server")}
            value={this.state.port_server}
            type="text"
            id="outlined-basic"
            label="Port Server"
            variant="filled"
          />
        </Grid>

        <Grid item my={1}>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Button
                onClick={this.onClickTestConnectionButton}
                color="success"
                variant="outlined"
                size="small"
              >
                Test Connection
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={this.onClickSaveButton}
                type="submit"
                variant="contained"
                size="small"
                sx={{ backgroundColor: blue[900] }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}
