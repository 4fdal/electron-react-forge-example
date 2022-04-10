import { Button, Grid, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { meToast, onChangeHandle } from "../../../utils/helpers/call-helper";
import { rendererInvoke } from "../../../utils/ipc-renderer";
import SettingsStorage from "../../../utils/storages/settings-storage";

export default class InputDatabaseSetting extends React.Component {
  state = {
    ip_database: "",
    port_database: "",
    user_database: "",
    password_database: "",
    name_database: "",
  };

  componentDidMount = () => {
    // get setting from local storage and set state
    let {
      ip_database,
      port_database,
      user_database,
      password_database,
      name_database,
    } = SettingsStorage.getSettingDatabase();
    this.setState({
      ip_database,
      port_database,
      user_database,
      password_database,
      name_database,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      ip_database: host,
      port_database: port,
      user_database: user,
      password_database: password,
      name_database: database,
    } = this.state;

    rendererInvoke("database.test.connection", {
      host,
      port,
      user,
      password,
      database,
    })
      .then(response => {
        SettingsStorage.setSettingDatabase({
          ip_database: this.state.ip_database,
          port_database: this.state.port_database,
          user_database: this.state.user_database,
          password_database: this.state.password_database,
          name_database: this.state.name_database,
        });
        meToast("success", "Berhasil mengupdate setting database");
      })
      .catch(err => {
        meToast("error", "Gagal melakukan koneksi ke database");
      });
  };

  onClickSaveButton = () => {
    this.setState({
      ip_database: this.state.ip_database.trim(),
      port_database: this.state.port_database.trim(),
      user_database: this.state.user_database.trim(),
      password_database: this.state.password_database.trim(),
      name_database: this.state.name_database.trim(),
    });
  };

  onClickTestConnectionButton = () => {
    const {
      ip_database: host,
      port_database: port,
      user_database: user,
      password_database: password,
      name_database: database,
    } = this.state;

    rendererInvoke("database.test.connection", {
      host,
      port,
      user,
      password,
      database,
    })
      .then(response => {
        meToast("success", "Berhasil melakukan koneksi ke");
      })
      .catch(err => {
        meToast("error", "Gagal melakukan koneksi ke database");
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
            onChange={onChangeHandle(this, "ip_database")}
            value={this.state.ip_database}
            type="text"
            id="outlined-basic"
            label="Ip Database"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "port_database")}
            value={this.state.port_database}
            type="text"
            id="outlined-basic"
            label="Port Database"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "user_database")}
            value={this.state.user_database}
            type="text"
            id="outlined-basic"
            label="User Database"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "password_database")}
            value={this.state.password_database}
            type="password"
            id="outlined-basic"
            label="Password Database"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "name_database")}
            value={this.state.name_database}
            type="text"
            id="outlined-basic"
            label="Name Database"
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
