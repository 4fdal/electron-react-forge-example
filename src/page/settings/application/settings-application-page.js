import { Grid, Paper } from "@mui/material";
import React from "react";
import InputApplicationSetting from "../../../components/advence/settings/input-application-setting";

export default class SettingsApplicationPage extends React.Component {
  render = () => {
    return (
      <Grid container p={2} width="100%">
        <Grid item>
          <Paper
            sx={{
              padding: 4,
              borderRadius: 3,
              height: 520,
            }}
          >
            <InputApplicationSetting />
          </Paper>
        </Grid>
      </Grid>
    );
  };
}
