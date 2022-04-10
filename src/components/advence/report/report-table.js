import { Sync } from "@mui/icons-material";
import { Skeleton, Button, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import {
  getWebBasePath,
  objectToQueryString,
  queryStringToObject,
} from "../../../utils/helpers/call-helper";
import RequestReport from "../../../utils/requests/report";
import MeTable from "../../base/me-table";

class ReportTable extends React.Component {
  static defaultProps = {
    router: {
      location: {},
      params: {},
      navigate: (to, options) => {},
    },
  };

  state = {
    tableHeaderColumn: [
      {
        label: "ID Timbangan",
        key: "id",
      },
      {
        label: "Machine Number",
        key: "machine_number",
      },
      {
        label: "Gross",
        key: "gross",
      },
      {
        label: "Tare",
        key: "tare",
      },
      {
        label: "Netto",
        key: "netto",
      },
      {
        label: "Judgement",
        key: "judgement",
      },
      {
        label: "Application",
        key: "application.name",
      },
      {
        label: "Product",
        key: "product.name",
      },
      {
        label: "Shift",
        key: "shift.name",
      },
      {
        label: "User",
        key: "user.name",
      },
    ],
    tableData: [],
    count: 0,
    page: 1,
    per_page: 10,
    isLoading: false,
  };

  getReports = (objectToQueryString = {}, isSync = false) => {
    this.setState({ isLoading: true });
    return RequestReport.getReports(objectToQueryString, isSync)
      .then(response => {
        let {
          data: tableData,
          total: count,
          current_page: page,
          per_page,
        } = response;

        tableData = tableData.map((item, index) => {
          item["application.name"] = item.application.name;
          item["product.name"] = item.product.name;
          item["shift.name"] = item.shift.name;
          item["user.name"] = item.user.name;

          return item;
        });

        this.setState({ tableData, count, page, per_page });
      })
      .catch(err => err.handle())
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  onPageChange = (e, page) => {
    let per_page = this.state.per_page;
    page += 1;
    this.props.router.navigate(
      getWebBasePath("/home/report?" + objectToQueryString({ per_page, page }))
    );
    this.getReports({ page, per_page });
  };

  onRowsPerPageChange = per_page => {
    let page = 1;
    this.props.router.navigate(
      getWebBasePath("/home/report?" + objectToQueryString({ per_page, page }))
    );
    this.getReports({ per_page });
  };

  componentDidMount = () => {
    // make request data products

    this.getReports(
      queryStringToObject(this.props?.router?.location?.search ?? "?")
    );
  };

  render = () => {
    return (
      <Grid container flexDirection={"column"} spacing={2}>
        <Grid item md={12}>
          <Grid container flexDirection={"row"} justifyContent={"flex-end"}>
            <Grid item>
              <Button
                onClick={() => this.getReports({}, true)}
                variant={"contained"}
                size="small"
                sx={{ backgroundColor: blue[900] }}
                startIcon={<Sync />}
              >
                Sync
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          {this.state.isLoading && <Skeleton />}
          <MeTable
            styleTableContainer={{
              maxHeight: 450,
              maxWidth: 980,
            }}
            hiddenNumber={true}
            pagination={{
              count: this.state.count,
              page: this.state.page - 1,
              onPageChange: this.onPageChange,
              onRowsPerPageChange: this.onRowsPerPageChange,
            }}
            tableHeaderColumns={this.state.tableHeaderColumn}
            tableData={this.state.tableData}
            hiddenActions={true}
          />
        </Grid>
      </Grid>
    );
  };
}

export default ReportTable;
