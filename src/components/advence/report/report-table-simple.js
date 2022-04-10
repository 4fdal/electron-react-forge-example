import React from "react";
import RequestReport from "../../../utils/requests/report";
import MeTableSimple from "../../base/me-table-simple";
import moment from "moment";
import { Skeleton, Box } from "@mui/material";

export default class ReportTableSimple extends React.Component {
  state = {
    tableHeaderColumn: [
      {
        label: "Nomor Mesin",
        key: "machine_number",
      },
      {
        label: "Produk",
        key: "product.name",
      },
      {
        label: "Berat",
        key: "product.heavy",
      },
      {
        label: "Created At",
        key: "created_at",
      },
    ],
    tableData: [],
    isLoading: false,
  };

  getReports = (objectToQueryString = {}) => {
    this.setState({ isLoading: true });
    return RequestReport.getReports(objectToQueryString)
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
          item["product.heavy"] = item.product.heavy;

          item["created_at"] = moment(item.created_at).fromNow();

          return item;
        });

        this.setState({ tableData, count, page, per_page });
      })
      .catch(err => err.handle())
      .finally(() => this.setState({ isLoading: false }));
  };
  componentDidMount = () => {
    // make request data products

    this.getReports({});
  };

  render = () => {
    return this.state.isLoading ? (
      <Skeleton variant="rectangular" height={350} />
    ) : (
      <Box height={370}>
        <MeTableSimple
          tableHeaderColumns={this.state.tableHeaderColumn}
          tableData={this.state.tableData}
        />

      </Box>
    );
  };
}
