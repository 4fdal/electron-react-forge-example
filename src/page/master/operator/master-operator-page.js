import { Grid, Paper } from "@mui/material";
import React from "react";
import UserTable from "../../../components/advence/user/user-table";

export default class MasterOperatorPage extends React.Component {
  render = () => {
    return (
      <Grid container p={2} width="100%">
        <Grid item>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 3,
              height: 550,
            }}
          >
            <UserTable {...this.props} />
          </Paper>
        </Grid>
      </Grid>
    );
  };
}
