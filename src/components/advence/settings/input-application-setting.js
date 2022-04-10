/* eslint-disable eqeqeq */
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { KEY_APPLICATION } from "../../../utils/constants/call-key-storage";
import { meToast, onChangeHandle } from "../../../utils/helpers/call-helper";
import RequestApplication from "../../../utils/requests/application";
import SettingsStorage from "../../../utils/storages/settings-storage";

export default class InputApplicationSetting extends React.Component {
  state = {
    id_application: "",
    is_accept_all_condition:
      SettingsStorage.getSettingApplication().is_accept_all_condition,
    applications: [],
  };

  componentDidMount = () => {
    this.getApplications();
  };

  getApplication = (applications = this.state.applications) => {
    // get setting from local storage and set state
    let { id_application } = SettingsStorage.getSettingApplication();

    // get default id application
    let application = applications.find(({ name }) => name == id_application);
    if (!application) {
      application = applications[0];
    }

    return application;
  };

  getApplications = () => {
    return RequestApplication.getApplications({ all: true }).then(
      ({ data: applications }) => {
        let application = this.getApplication(applications);
        let id_application = application.name;

        this.setState({
          applications,
          id_application,
        });
      }
    );
  };

  onSubmit = e => {
    e.preventDefault();

    let application = this.getApplication(this.state.applications);

    // set setting from local storage
    localStorage.setItem(KEY_APPLICATION, JSON.stringify(application));
    SettingsStorage.setSettingApplication({
      id_application: this.state.id_application,
      is_accept_all_condition: this.state.is_accept_all_condition,
    });

    // show toast
    meToast("success", "Berhasil mengupdate setting applikasi");
  };

  onClickSaveButton = () => {
    this.setState({
      id_application: this.state.id_application.trim(),
    });
  };

  render = () => {
    return (
      <Grid
        component={"form"}
        onSubmit={this.onSubmit}
        flexDirection={"column"}
        sx={{ width: '100%' }}
        spacing={1}
      >
        <Grid item>
          <FormControl variant="filled" size="small" fullWidth>
            <InputLabel>ID Application</InputLabel>
            <Select
              value={this.state.id_application}
              onChange={onChangeHandle(this, "id_application")}
              label="ID Application"
            >
              {this.state.applications.map(application => {
                return (
                  <MenuItem key={application.id} value={application.name}>
                    {application.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Scales all condition</FormLabel>
            <FormControlLabel
              onChange={e =>
                this.setState({ is_accept_all_condition: e.target.checked })
              }
              control={
                <Checkbox checked={this.state.is_accept_all_condition} />
              }
              label="Allow"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>
        <Grid item my={1}>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Button
                onClick={this.onClickSaveButton}
                type="submit"
                size="small"
                variant="contained"
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
