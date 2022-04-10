import { Grid, Paper, Skeleton, Typography } from "@mui/material";
import { blue, yellow } from "@mui/material/colors";
import React from "react";
import RequestScales from "../../../utils/requests/scales";

export default class ScalesInformation extends React.Component {
  static defaultProps = {
    router: {
      location: {},
      params: {},
      navigate: (to, options) => {},
    },
    onSuccessGetScales: response => {},
    onFailedGetScales: err => {},
  };

  state = {
    netto: 0.0,
    tare: 0.0,
    gross: 0.0,
    isLoading: false,
  };

  // get if use ref
  getScalesInformation = () => {
    const { gross, netto, tare } = this.state;

    return {
      gross,
      netto,
      tare,
    };
  };

  // get scales
  getScales = () => {
    this.setState({ isLoading: true });
    return RequestScales.getScales()
      .then(response => {
        let { netto, tare, gross } = response;
        let scalesData = {
          netto,
          tare,
          gross,
        };

        this.props.onSuccessGetScales(scalesData);
        this.setState(scalesData);
      })
      .catch(err => this.props.onFailedGetScales)
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount = () => {
    // call method get scales
    this.getScales();
  };

  render = () => {
    return (
      <Paper
        sx={{
          width: "100%",
          backgroundColor: blue[900],
          color: "white",
          borderRadius: 3,
        }}
      >
        <Grid container>
          <Grid
            item
            sx={{
              borderRightWidth: 1,
              borderRightStyle: "solid",
              borderRightColor: "white",
            }}
            sm={6}
          >
            <Grid
              container
              flexDirection={"column"}
              height={"100%"}
              justifyContent={"space-between"}
              p={2}
            >
              <Grid item>
                <Typography fontWeight={"bold"} color={yellow[700]}>
                  Netto
                </Typography>
              </Grid>
              <Grid item>
                {this.state.isLoading ? (
                  <Skeleton variant="text" />
                ) : (
                  <Typography
                    fontWeight={"bold"}
                    variant="h3"
                    textAlign={"end"}
                  >
                    {this.state.netto} <sub>Kg</sub>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Grid container flexDirection={"column"}>
              <Grid item>
                <Grid
                  container
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  p={1}
                >
                  <Grid item>
                    <Typography fontWeight={"bold"}>Tare</Typography>
                  </Grid>
                  <Grid item>
                    {this.state.isLoading ? (
                      <Skeleton variant="text" />
                    ) : (
                      <Typography
                        textAlign={"end"}
                        variant="h5"
                        fontWeight="bold"
                      >
                        {this.state.tare} <sub>Kg</sub>
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  borderTopWidth: 1,
                  borderTopStyle: "solid",
                  borderTopColor: "white",
                }}
                p={1}
                item
              >
                <Grid
                  container
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Grid item>
                    <Typography fontWeight="bold">Gross</Typography>
                  </Grid>
                  <Grid item>
                    {this.state.isLoading ? (
                      <Skeleton variant="text" />
                    ) : (
                      <Typography
                        textAlign={"end"}
                        variant="h5"
                        fontWeight="bold"
                      >
                        {this.state.gross} <sub>Kg</sub>
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  };
}
