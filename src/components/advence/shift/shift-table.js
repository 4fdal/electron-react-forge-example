import { Sync } from "@mui/icons-material";
import { Button, Grid, Skeleton } from "@mui/material";
import React from "react";
import {
  getWebBasePath,
  objectToQueryString,
  queryStringToObject,
} from "../../../utils/helpers/call-helper";
import RequestShift from "../../../utils/requests/shift";
import MeTable from "../../base/me-table";

class ShiftTable extends React.Component {
  static defaultProps = {
    router: {
      location: {},
      params: {},
      navigate: (to, options) => { },
    },
  };

  refModalConfirmation = React.createRef();

  state = {
    tableHeaderColumn: [
      {
        label: "Nama",
        key: "name",
      },
      {
        label: "Dari Jam",
        key: "start_time",
      },
      {
        label: "Sampai Jam",
        key: "end_time",
      },
    ],
    tableData: [],
    count: 0,
    page: 1,
    per_page: 10,
    isLoading: false,
  };

  getShift = (objectToQueryString = {}, isSync = false) => {
    this.setState({ isLoading: true });
    return RequestShift.getShifts(objectToQueryString, isSync)
      .then(response => {
        let {
          data: tableData,
          total: count,
          current_page: page,
          per_page,
        } = response;

        this.setState({ tableData, count, page, per_page });
      })
      .catch(err => err.handle())
      .finally(() => this.setState({ isLoading: false }));
  };

  onPageChange = (e, page) => {
    let per_page = this.state.per_page;
    page += 1;
    this.props.router.navigate(
      getWebBasePath(
        "/home/master/shift?" + objectToQueryString({ per_page, page })
      )
    );
    this.getShift({ page, per_page });
  };

  onRowsPerPageChange = per_page => {
    let page = 1;
    this.props.router.navigate(
      getWebBasePath(
        "/home/master/shift?" + objectToQueryString({ per_page, page })
      )
    );
    this.getShift({ per_page });
  };

  componentDidMount = () => {
    this.getShift(
      queryStringToObject(this.props?.router?.location?.search ?? "?")
    );
  };

  render = () => {
    return (
      <Grid container flexDirection={"column"} spacing={4}>
        <Grid item>
          <Grid container flexDirection={"row"} justifyContent={"flex-end"}>
            <Grid item>
              <Button
                onClick={this.onSyncButtonClick}
                startIcon={<Sync />}
                size="small"
                variant={"contained"}
              >
                Sync
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {this.state.isLoading && <Skeleton />}
          <MeTable
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

export default ShiftTable;
