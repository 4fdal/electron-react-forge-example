import { Grid, Paper } from "@mui/material";
import React from "react";
import InputDatabaseSetting from "../../../components/advence/settings/input-database-setting";

export default class SettingsDatabasePage extends React.Component {
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
            <InputDatabaseSetting />
          </Paper>
        </Grid>
      </Grid>
    );
  };
}
