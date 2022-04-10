import { Sync } from "@mui/icons-material";
import { Skeleton, Button, Grid } from "@mui/material";
import React from "react";
import {
  getWebBasePath,
  objectToQueryString,
  queryStringToObject,
} from "../../../utils/helpers/call-helper";
import RequestProductShift from "../../../utils/requests/product-shift";
import MeTable from "../../base/me-table";

class ProductShiftTable extends React.Component {
  static defaultProps = {
    router: {
      location: {},
      params: {},
      navigate: (to, options) => {},
    },
  };

  refModalConfirmation = React.createRef();

  state = {
    tableHeaderColumn: [
      {
        label: "Nama Produk",
        key: "product.name",
      },
      {
        label: "Berat",
        key: "product.heavy",
      },
      {
        label: "Max",
        key: "product.max_tolerance",
      },
      {
        label: "Min",
        key: "product.min_tolerance",
      },
      {
        label: "Shift",
        key: "shift.name",
      },
    ],
    tableData: [],
    count: 0,
    page: 1,
    per_page: 10,
    isLoading: false,
  };

  getProductShift = (objectToQueryString = {}, isSync = false) => {
    this.setState({ isLoading: true });
    return RequestProductShift.getProductShifts(
      objectToQueryString ?? {},
      isSync
    )
      .then(response => {
        let {
          data: tableData,
          total: count,
          current_page: page,
          per_page,
        } = response;

        tableData = tableData.map(row => {
          if (row.product) {
            for (let key in row.product) {
              row[`product.${key}`] = row.product[key];
            }
          }

          if (row.shift) {
            for (let key in row.shift) {
              row[`shift.${key}`] = row.shift[key];
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
        "/home/master/product?" + objectToQueryString({ per_page, page })
      )
    );
    this.getProductShift({ page, per_page });
  };

  onRowsPerPageChange = per_page => {
    let page = 1;
    this.props.router.navigate(
      getWebBasePath(
        "/home/master/product?" + objectToQueryString({ per_page, page })
      )
    );
    this.getProductShift({ per_page });
  };

  componentDidMount = () => {
    // make request data products

    this.getProductShift(
      queryStringToObject(this.props?.router?.location?.search ?? "?")
    );
  };

  onSyncButtonClick = () => {
    this.getProductShift({}, true);
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

export default ProductShiftTable;
