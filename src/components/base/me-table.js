import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { v4 } from "uuid";
import React from "react";
import { Delete, Edit } from "@mui/icons-material";

export default class MeTable extends React.Component {
  static defaultProps = {
    tableHeaderColumns: [
      {
        label: "Example",
        key: "example",
      },
    ],
    tableData: [
      {
        example: "example field",
      },
    ],
    tableEditActionHandle: (tableData, tableIndex) => { },
    tableDeleteActionHandle: (tableData, tableIndex) => { },
    pagination: {
      count: 999,
      page: 0,
      onPageChange: e => { },
      onRowsPerPageChange: rowsPerPage => { },
    },
    hiddenActions: false,
    hiddenNumber: false,
    styleTableContainer: {},
  };

  state = {
    rowsPerPage: 10,
  };

  onRowsPerPageChange = ({ target: { value: rowsPerPage } }) => {
    this.setState({ rowsPerPage });
    this.props?.pagination?.onRowsPerPageChange(rowsPerPage);
  };

  render = () => {
    return (
      <Grid container>
        <Grid item width="100%">
          <TableContainer
            sx={{ maxHeight: 440, ...this.props.styleTableContainer }}
          >
            <Table size="small" stickyHeader aria-label="sticky table">
              <TableHead>
                {/* name	heavy	min_tolerance	max_tolerance */}
                <TableRow>
                  {!this.props.hiddenNumber && <TableCell>No</TableCell>}

                  {this.props.tableHeaderColumns.map(tableHeaderColumn => {
                    return (
                      <TableCell key={v4()}>
                        {tableHeaderColumn.label}
                      </TableCell>
                    );
                  })}

                  {!this.props.hiddenActions && <TableCell>Action</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.tableData.map((data, index) => {
                  return (
                    <TableRow key={v4()}>
                      {!this.props.hiddenNumber && (
                        <TableCell>
                          {index +
                            1 +
                            this.props.pagination.page * this.state.rowsPerPage}
                        </TableCell>
                      )}
                      {this.props.tableHeaderColumns.map(tableHeaderColumn => {
                        return (
                          <TableCell key={v4()}>
                            {data[tableHeaderColumn.key]}
                          </TableCell>
                        );
                      })}

                      {!this.props.hiddenActions && (
                        <TableCell>
                          <Grid container spacing={1}>
                            <Grid item>
                              <IconButton
                                onClick={() =>
                                  this.props.tableEditActionHandle(data, index)
                                }
                              >
                                <Edit />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton
                                onClick={() =>
                                  this.props.tableDeleteActionHandle(
                                    data,
                                    index
                                  )
                                }
                              >
                                <Delete />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={this.props.pagination.count}
            rowsPerPage={this.state.rowsPerPage}
            page={this.props.pagination.page}
            onPageChange={this.props.pagination.onPageChange}
            onRowsPerPageChange={this.onRowsPerPageChange}
          />
        </Grid>
      </Grid>
    );
  };
}
