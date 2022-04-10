import { Grid, Paper } from "@mui/material";
import React from "react";
import ShiftTable from "../../../components/advence/shift/shift-table";

export default class MasterShiftPage extends React.Component {
  render = () => {
    return (
      <Grid Container p={2} width="100%">
        <Grid item>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 3,
              height: 550,
            }}
          >
            <ShiftTable {...this.props} />
          </Paper>
        </Grid>
      </Grid>
    );
  };
}
