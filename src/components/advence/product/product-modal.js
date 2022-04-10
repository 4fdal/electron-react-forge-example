import { Search } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  TextField,
} from "@mui/material";
import React from "react";
import {
  getWebBasePath,
  objectToQueryString,
  onChangeHandle,
  queryStringToObject,
} from "../../../utils/helpers/call-helper";
import MeTableModal from "../../base/me-table-modal";
import { KEY_SHIFT } from "../../../utils/constants/call-key-storage";
import RequestProductShift from "../../../utils/requests/product-shift";

export default class ProductModal extends React.Component {
  static defaultProps = {
    router: {
      location: {},
      params: {},
      navigate: (to, options) => { },
    },
    onClickTableRow: (item, index) => { },
  };

  state = {
    search: "",
    open: false,
    tableHeaderColumn: [
      {
        label: "ID",
        key: "id",
      },
      {
        label: "Nama Produk",
        key: "name",
      },
      {
        label: "Berat Produk",
        key: "heavy",
      },
    ],
    tableData: [],
    count: 0,
    page: 1,
    per_page: 10,
    isLoading: false,
  };

  open = (newState = {}) => {
    // make request data products
    this.getProducts(
      queryStringToObject(this.props?.router?.location?.search ?? "?")
    );

    this.setState({ ...this.state, open: true, ...newState });
  };

  close = () => this.setState({ open: false });

  getProducts = (objectToQueryString = {}) => {
    let shift = JSON.parse(localStorage.getItem(KEY_SHIFT));

    if (shift) {
      objectToQueryString = {
        ...objectToQueryString,
        shift_id: shift.id,
      };

      this.setState({ isLoading: true });
      RequestProductShift.getProductShifts(objectToQueryString)
        .then(response => {
          let {
            data: tableData,
            total: count,
            current_page: page,
            per_page,
          } = response;

          tableData = tableData.map(({ product }) => {
            return product;
          });

          this.setState({ tableData, count, page, per_page });
        })
        .catch(err => err.handle())
        .finally(() => this.setState({ isLoading: false }));
    }
  };

  onPageChange = (e, page) => {
    let per_page = this.state.per_page;
    page += 1;
    this.props.router.navigate(
      getWebBasePath("?" + objectToQueryString({ per_page, page }))
    );
    this.getProducts({ page, per_page });
  };

  onRowsPerPageChange = per_page => {
    let page = 1;
    this.props.router.navigate(
      getWebBasePath("?" + objectToQueryString({ per_page, page }))
    );
    this.getProducts({ per_page });
  };

  onSearchIconClick = () => {
    const { search: name } = this.state;
    this.getProducts({ name });
  };

  onSearchKeyUpEnter = e => {
    if (e.key === "Enter") {
      const { search: name } = this.state;
      this.getProducts({ name });
    }
  };

  render = () => {
    return (
      <Dialog open={this.state.open} onClose={this.close}>
        <DialogTitle>
          <TextField
            onKeyUp={this.onSearchKeyUpEnter}
            onChange={onChangeHandle(this, "search")}
            value={this.state.search}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <IconButton onClick={this.onSearchIconClick}>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </DialogTitle>
        <DialogContent>
          {this.state.isLoading && <Skeleton />}
          <MeTableModal
            onClickTableRow={this.props.onClickTableRow}
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
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  };
}
