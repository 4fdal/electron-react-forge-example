import { Card, Grid } from "@mui/material";
import React from "react";
import ReportSearch from "../../components/advence/report/report-search";
import ReportTable from "../../components/advence/report/report-table";
import exportFromJSON from "export-from-json";
import RequestReport from "../../utils/requests/report";

export default class ReportPage extends React.Component {
  refReportTable = React.createRef();

  onSearch = inputSearch => {
    // const { from, to, machine_number, product_id, shift_id, user_id } =
    //   inputSearch;

    this.refReportTable.getReports(inputSearch);
  };

  onExport = inputSearch => {
    // const { from, to, machine_number, product_id, shift_id, user_id, all } =
    //   inputSearch;
    const fileName = `report-${new Date().getTime()}`;
    const exportType = exportFromJSON.types.xls;

    RequestReport.getReports(inputSearch).then(({ data }) => {
      data = data.map(item => {
        return {
          id: item.id,
          machine_number: item.machine_number,
          gross: item.gross,
          tare: item.tare,
          netto: item.netto,
          judgement: item.judgement,
          application: item.application.name,
          product: item.product.name,
          shift: item.shift.name,
          user: item.user.name,
          created_at: item.created_at,
          updated_at: item.updated_at,
        };
      });

      exportFromJSON({ data, fileName, exportType });
    });
  };

  render = () => {
    return (
      <Grid container p={1} width={"100%"} justifyContent="space-between">
        <Grid item md={9}>
          <Grid container>
            <Grid item md={12}>
              <Card
                sx={{
                  height: 550,
                  padding: 2,
                  borderRadius: 3,
                }}
              >
                <ReportTable
                  ref={ref => (this.refReportTable = ref)}
                  {...this.props}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Grid container pl={1}>
            <Grid item md={12}>
              <Card
                sx={{
                  padding: 2,
                  borderRadius: 3,
                }}
              >
                <ReportSearch
                  router={this.props.router}
                  onSearch={this.onSearch}
                  onExport={this.onExport}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}
