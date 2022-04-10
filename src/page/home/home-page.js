import { Grid, Card } from "@mui/material";
import React from "react";
import ScalesCondition from "../../components/advence/home/scales-condition";
import ScalesFrom from "../../components/advence/home/scales-form";
import ScalesInformation from "../../components/advence/home/scales-information";
import ReportTableSimple from "../../components/advence/report/report-table-simple";
import appContext from "../../contexts/app-context";

class HomePage extends React.Component {
  static contextType = appContext;

  refScalesInformation = React.createRef();
  refReportTableSimple = React.createRef();

  state = {
    activeScalesCondition: ScalesCondition.SCALES_CONDITION_DEFAULT,
    netto: null,
    tare: null,
    gross: null,
    isLoadedScalesInformation: false,
  };

  onSuccessGetScales = response => {
    let { netto, tare, gross } = response;
    this.setState({ netto, tare, gross, isLoadedScalesInformation: true });
  };

  onFailedGetScales = err => {
    this.setState({
      isLoadedScalesInformation: true,
    });
  };

  onClickTableRow = (product, index) => {
    // get information sclaes
    let { netto } = this.state;

    // get information product
    // type : id, name, heavy, max_tolerance, min_tolerance
    let { max_tolerance, min_tolerance } = product;

    // logic set condition scales
    let activeScalesCondition = ScalesCondition.SCALES_CONDITION_DEFAULT;
    if (netto > max_tolerance) {
      activeScalesCondition = ScalesCondition.SCALES_CONDITION_HIGH;
    } else if (netto <= max_tolerance && netto >= min_tolerance) {
      activeScalesCondition = ScalesCondition.SCALES_CONDITION_OK;
    } else {
      activeScalesCondition = ScalesCondition.SCALES_CONDITION_LOW;
    }
    this.setState({ activeScalesCondition });
  };

  onSaveReportSuccess = response => {
    // todo code..
    this.refReportTableSimple.getReports();
  };

  render = () => {
    return (
      <>
        <Grid p={1.5} flexDirection={"column"}>
          {/* weight */}
          <Grid item>
            <ScalesInformation
              onSuccessGetScales={this.onSuccessGetScales}
              onFailedGetScales={this.onFailedGetScales}
              ref={ref => (this.refScalesInformation = ref)}
              router={this.props.router}
            />
          </Grid>

          {/* content */}
          <Grid item>
            <Grid container pt={1} spacing={1}>
              <Grid item sm={11.5}>
                <Card sx={{ borderRadius: 3, }}>
                  <Grid container>
                    <Grid item md={6}>
                      {/* form scales */}
                      {this.state.isLoadedScalesInformation && (
                        <ScalesFrom
                          netto={this.state.netto}
                          tare={this.state.tare}
                          gross={this.state.gross}
                          onSaveSuccess={this.onSaveReportSuccess}
                          activeScalesCondition={
                            this.state.activeScalesCondition
                          }
                          router={this.props.router}
                          onClickTableRow={this.onClickTableRow}
                        />
                      )}
                    </Grid>
                    <Grid item md={6} p={3}>
                      {/* table */}
                      <ReportTableSimple
                        ref={ref => (this.refReportTableSimple = ref)}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item sm={0.5}>
                <ScalesCondition
                  active={this.state.activeScalesCondition}
                  ref={ref => (this.refScalesCondition = ref)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
}

export default HomePage;
