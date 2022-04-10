/* eslint-disable eqeqeq */
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { v4 } from "uuid";
import { onChangeHandle } from "../../../utils/helpers/call-helper";
import RequestReport from "../../../utils/requests/report/index";
import momen from "moment";

export default class ReportSearch extends React.Component {
  static defaultProps = {
    onSearch: ({
      from,
      to,
      machine_number,
      product_id,
      shift_id,
      user_id,
    }) => { },
    onExport: ({
      from,
      to,
      machine_number,
      product_id,
      shift_id,
      user_id,
      all = true,
    }) => { },
  };

  state = {
    from: momen(new Date()).format("YYYY-MM-DD") + " 00:00:00",
    operators: [],
    products: [],
    shifts: [],
    to: momen(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    product_id: "",
    machine_number: "",
    user_id: "",
    shift_id: "",
    isLoading: false,
  };

  getInputSearch = (inputReplace = {}) => {
    let { from, to, product_id, shift_id, user_id, machine_number } =
      this.state;

    from = from != "" ? momen(from).format("YYYY-MM-DD HH:mm:ss") : "";
    to = to != "" ? momen(to).format("YYYY-MM-DD HH:mm:ss") : "";

    return {
      from,
      to,
      product_id,
      shift_id,
      user_id,
      machine_number,
      ...inputReplace,
    };
  };

  // request get product, operator, and shift.
  getFragmentReportSearch = () => {
    this.setState({ isLoading: true });
    return RequestReport.getFragmentReportSearch()
      .then(response => {
        let { operators, products, shifts } = response;
        this.setState({ operators, products, shifts });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount = () => {
    // call request get product, operator, and shift.
    this.getFragmentReportSearch();
  };

  renderSelectItems = ({ id, name }, index) => {
    return (
      <MenuItem key={v4()} value={id}>
        {name}
      </MenuItem>
    );
  };

  render = () => {
    return (
      <Grid container flexDirection={"column"} spacing={3}>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            onChange={onChangeHandle(this, "from")}
            value={this.state.from}
            type="datetime"
            id="outlined-basic"
            label="From"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            onChange={onChangeHandle(this, "to")}
            value={this.state.to}
            type="datetime"
            id="outlined-basic"
            label="To"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </Grid>
        {!this.state.isLoading && (
          <Grid item>
            <FormControl variant="filled" size="small" fullWidth>
              <InputLabel>Nama Produk</InputLabel>
              <Select
                value={this.state.product_id}
                onChange={onChangeHandle(this, "product_id")}
                label="Nama Produk"
              >
                <MenuItem key={v4()} value={""}>
                  Semua
                </MenuItem>
                {this.state.products.map(this.renderSelectItems)}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item>
          <TextField
            size="small"
            fullWidth
            onChange={onChangeHandle(this, "machine_number")}
            value={this.state.machine_number}
            type="text"
            id="outlined-basic"
            label="Nomor Mesin"
            variant="filled"
          />
        </Grid>
        {!this.state.isLoading && (
          <Grid item>
            <FormControl variant="filled" size="small" fullWidth>
              <InputLabel>Operator</InputLabel>
              <Select
                value={this.state.user_id}
                onChange={onChangeHandle(this, "user_id")}
                label="Nama Product"
              >
                <MenuItem key={v4()} value={""}>
                  Semua
                </MenuItem>
                {this.state.operators.map(this.renderSelectItems)}
              </Select>
            </FormControl>
          </Grid>
        )}
        {!this.state.isLoading && (
          <Grid item>
            <FormControl variant="filled" size="small" fullWidth>
              <InputLabel>Shift</InputLabel>
              <Select
                value={this.state.shift_id}
                onChange={onChangeHandle(this, "shift_id")}
                label="Nama Product"
              >
                <MenuItem key={v4()} value={""}>
                  Semua
                </MenuItem>
                {this.state.shifts.map(this.renderSelectItems)}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item>
          <Button
            onClick={() => this.props.onSearch(this.getInputSearch())}
            fullWidth
            variant="contained"
          >
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() =>
              this.props.onExport(this.getInputSearch({ all: true }))
            }
            fullWidth
            variant="contained"
          >
            Export
          </Button>
        </Grid>
      </Grid>
    );
  };
}
