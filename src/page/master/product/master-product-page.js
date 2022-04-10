import { Grid, Paper } from "@mui/material";
import React from "react";
import ProductShiftTable from "../../../components/advence/product-shift/product-shift-table";

export default class MasterProductPage extends React.Component {
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
            <ProductShiftTable {...this.props} />
          </Paper>
        </Grid>
      </Grid>
    );
  };
}
