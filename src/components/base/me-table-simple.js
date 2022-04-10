import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { v4 } from "uuid";
import React from "react";

export default class MeTableSimple extends React.Component {
  static defaultProps = {
    onClickTableRow: (item, index) => { },
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
  };

  render = () => {
    return (
      <>
        <TableContainer>
          <Table size="small" aria-labelledby="tableTitle">
            <TableHead>
              {/* name	heavy	min_tolerance	max_tolerance */}
              <TableRow>
                {this.props.tableHeaderColumns.map(tableHeaderColumn => {
                  return (
                    <TableCell key={v4()}>{tableHeaderColumn.label}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.tableData.map((data, index) => {
                return (
                  <TableRow
                    hover
                    onClick={() => this.props.onClickTableRow(data, index)}
                    key={v4()}
                  >
                    {this.props.tableHeaderColumns.map(tableHeaderColumn => {
                      return (
                        <TableCell key={v4()}>
                          {data[tableHeaderColumn.key]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
}
