import { Grid, Paper } from "@mui/material";
import React from "react";
import InputScaleSetting from "../../../components/advence/settings/input-scale-setting ";

export default class SettingsScalePage extends React.Component {
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
            <InputScaleSetting />
          </Paper>
        </Grid>
      </Grid>
    );
  };
}
