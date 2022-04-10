import { Sync } from "@mui/icons-material";
import { Button, Grid, Skeleton } from "@mui/material";
import React from "react";
import {
  getWebBasePath,
  objectToQueryString,
  queryStringToObject,
} from "../../../utils/helpers/call-helper";
import RequestUser from "../../../utils/requests/user";
import MeTable from "../../base/me-table";

class UserTable extends React.Component {
  static defaultProps = {
    router: {
      location: {},
      params: {},
      navigate: (to, options) => { },
    },
  };

  state = {
    tableHeaderColumn: [
      {
        label: "Nama",
        key: "name",
      },
      {
        label: "Password",
        key: "password",
      },
      {
        label: "Role",
        key: "role.name",
      },
    ],
    tableData: [],
    count: 0,
    page: 1,
    per_page: 10,
    isLoading: false,
  };

  getUser = (objectToQueryString = {}, isSync = false) => {
    this.setState({ isLoading: true });
    return RequestUser.getUsers(objectToQueryString, isSync)
      .then(response => {
        let {
          data: tableData,
          total: count,
          current_page: page,
          per_page,
        } = response;

        tableData = tableData.map(row => {
          if (row.role) {
            for (let key in row.role) {
              row[`role.${key}`] = row.role[key];
            }
          }

          return row;
        });

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
        "/home/master/operator?" + objectToQueryString({ per_page, page })
      )
    );
    this.getUser({ page, per_page });
  };

  onRowsPerPageChange = per_page => {
    let page = 1;
    this.props.router.navigate(
      getWebBasePath(
        "/home/master/operator?" + objectToQueryString({ per_page, page })
      )
    );
    this.getUser({ per_page });
  };

  componentDidMount = () => {
    this.getUser(
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

export default UserTable;
