import { Grid, Paper } from "@mui/material";
import React from "react";
import InputServerSetting from "../../../components/advence/settings/input-server-setting";

export default class SettingsServerPage extends React.Component {
  render = () => {
    return (
      <Grid Container p={2} width="100%">
        <Grid item>
          <Paper
            sx={{
              padding: 4,
              borderRadius: 3,
              height: 520,
            }}
          >
            <InputServerSetting />
          </Paper>
        </Grid>
      </Grid>
    );
  };
}
