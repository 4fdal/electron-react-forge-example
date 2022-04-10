import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { meToast, onChangeHandle } from "../../../utils/helpers/call-helper";
import SettingsStorage from "../../../utils/storages/settings-storage";

export default class InputScaleSetting extends React.Component {
  state = {
    baudrate: "",
    databits: "",
    parity: "",
    port: "",
    delimiter: "",
    start_value_substring: "",
    length_value_substring: "",
    start_unit_substring: "",
    length_unit_substring: "",
  };

  componentDidMount = () => {
    // get setting from local storage and set state
    let {
      baudrate,
      databits,
      parity,
      port,
      delimiter,
      start_value_substring,
      length_value_substring,
      start_unit_substring,
      length_unit_substring,
    } = SettingsStorage.getSettingScale();
    this.setState({
      baudrate,
      databits,
      parity,
      port,
      delimiter,
      start_value_substring,
      length_value_substring,
      start_unit_substring,
      length_unit_substring,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    SettingsStorage.setSettingScale({
      baudrate: this.state.baudrate,
      databits: this.state.databits,
      parity: this.state.parity,
      port: this.state.port,
      delimiter: this.state.delimiter,
      start_value_substring: this.state.start_value_substring,
      length_value_substring: this.state.length_value_substring,
      start_unit_substring: this.state.start_unit_substring,
      length_unit_substring: this.state.length_unit_substring,
    });
    meToast("success", "Berhasil mengupdate setting scale");
  };

  onClickSaveButton = () => {
    this.setState({
      baudrate: this.state.baudrate.trim(),
      databits: this.state.databits.trim(),
      parity: this.state.parity.trim(),
      port: this.state.port.trim(),
      delimiter: this.state.delimiter.trim(),
      start_value_substring: this.state.start_value_substring.trim(),
      length_value_substring: this.state.length_value_substring.trim(),
      start_unit_substring: this.state.start_unit_substring.trim(),
      length_unit_substring: this.state.length_unit_substring.trim(),
    });
  };

  render = () => {
    return (
      <Grid component={"form"} onSubmit={this.onSubmit} container spacing={2}>
        <Grid item sm={6}>

          <FormControl variant="filled" size="small" fullWidth>
            <InputLabel>Baudrate</InputLabel>
            <Select
              value={this.state.baudrate}
              onChange={onChangeHandle(this, "baudrate")}
              label="Baudrate"
            >
              {[110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200, 128000, 256000].map(baudrate => {
                return (
                  <MenuItem key={baudrate} value={baudrate}>
                    {baudrate}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>


        </Grid>
        <Grid item sm={6}>
          <FormControl variant="filled" size="small" fullWidth>
            <InputLabel>Databits</InputLabel>
            <Select
              value={this.state.databits}
              onChange={onChangeHandle(this, "databits")}
              label="Databits"
            >
              {[7, 8].map(databits => {
                return (
                  <MenuItem key={databits} value={databits}>
                    {databits}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl variant="filled" size="small" fullWidth>
            <InputLabel>Parity</InputLabel>
            <Select
              value={this.state.parity}
              onChange={onChangeHandle(this, "parity")}
              label="Parity"
            >
              {["none", "odd", "even"].map(parity => {
                return (
                  <MenuItem key={parity} value={parity}>
                    {parity.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "port")}
            value={this.state.port}
            id="outlined-basic"
            label="Port"
            variant="filled"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "delimiter")}
            value={this.state.delimiter}
            id="outlined-basic"
            label="Delimiter"
            variant="filled"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "start_value_substring")}
            value={this.state.start_value_substring}
            type="number"
            id="outlined-basic"
            label="Start Value Substring"
            variant="filled"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "length_value_substring")}
            value={this.state.length_value_substring}
            type="number"
            id="outlined-basic"
            label="Length Value Substring"
            variant="filled"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "start_unit_substring")}
            value={this.state.start_unit_substring}
            type="number"
            id="outlined-basic"
            label="Start Unit Substring"
            variant="filled"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            size="small"
            fullWidth
            required
            onChange={onChangeHandle(this, "length_unit_substring")}
            value={this.state.length_unit_substring}
            type="number"
            id="outlined-basic"
            label="Start Unit Substring"
            variant="filled"
          />
        </Grid>

        <Grid item sm={12} my={1}>
          <Grid container justifyContent={"flex-end"}>
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
