/* eslint-disable jsx-a11y/alt-text */
import { Info, Visibility } from "@mui/icons-material";
import {
  Card,
  Grid,
  TableRow,
  Typography,
  Table,
  TableCell,
  TextField,
  Button,
} from "@mui/material";
import { blue, yellow } from "@mui/material/colors";
import React from "react";
import appConfig from "../../app.config";
import { KEY_LICENSE } from "../../utils/constants/call-key-storage";

export default class AboutPage extends React.Component {
  state = {
    isShowLicenseKey: false,
  };

  /**
   *
   * @returns {{ duration, application, license, organization }} result
   */
  getLicenseInformation = () => {
    let licenseInformation = JSON.parse(localStorage.getItem(KEY_LICENSE));

    if (!this.state.isShowLicenseKey) {
      licenseInformation.license =
        licenseInformation.license.substring(0, 4) +
        "*-*****-*****-*****-*****";
    }

    return licenseInformation;
  };

  onShowLicenseKeyButtonClick = () => {
    this.setState({ isShowLicenseKey: !this.state.isShowLicenseKey });
  };

  onDeactivateLicenseKeyButtonClick = () => {
    localStorage.removeItem(KEY_LICENSE);
    this.props.router.navigate("/license");
  };

  render = () => {
    const licenseInformation = this.getLicenseInformation();

    return (
      <Grid
        container
        sx={{ position: "absolute", height: "90vh" }}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={1}
      >
        <Grid item md={3}>
          <Card sx={{ borderRadius: 3, height: 320 }}>
            <Grid
              container
              flexDirection={"column"}
              sx={{ padding: 2 }}
              spacing={2}
            >
              <Grid item>
                <Grid
                  spacing={1}
                  container
                  alignItems={"center"}
                  flexDirection={"row"}
                >
                  <Grid item>
                    <Info sx={{ color: yellow[700] }} />
                  </Grid>
                  <Grid item>
                    <Typography>Developer Information</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justifyContent={"center"}>
                </Grid>
              </Grid>
              <Grid item>
                <Typography textAlign={"center"}>
                  {appConfig.vendorInformation.name}
                </Typography>
              </Grid>
              <Grid item>
                <Table size="small">
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: "none" }}>Name</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {appConfig.vendorInformation.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none" }}>Telp</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {appConfig.vendorInformation.telp}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none" }}>Website</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {appConfig.vendorInformation.website}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card sx={{ borderRadius: 3, height: 320 }}>
            <Grid
              container
              flexDirection={"column"}
              sx={{ padding: 2 }}
              spacing={2}
            >
              <Grid item>
                <Grid
                  spacing={1}
                  container
                  alignItems={"center"}
                  flexDirection={"row"}
                >
                  <Grid item>
                    <Info sx={{ color: yellow[700] }} />
                  </Grid>
                  <Grid item>
                    <Typography>License Information</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  sx={{ fontSize: 10 }}
                  value={licenseInformation.license}
                  size={"small"}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Table size="small" stickyHeader={false}>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: "none" }}>Organization</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {licenseInformation.organization}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none" }}>Application</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {licenseInformation.application}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none" }}>Duration</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {licenseInformation.duration}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item md={6}>
                    <Button
                      startIcon={<Visibility />}
                      variant="outlined"
                      sx={{
                        borderColor: blue[900],
                        color: blue[900],
                      }}
                      onClick={this.onShowLicenseKeyButtonClick}
                    >
                      Show
                    </Button>
                  </Grid>
                  <Grid item md={6}>
                    <Button
                      onClick={this.onDeactivateLicenseKeyButtonClick}
                      fullWidth
                      variant="outlined"
                      color="error"
                    >
                      Deactivate
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card sx={{ borderRadius: 3, height: 320 }}>
            <Grid
              container
              flexDirection={"column"}
              sx={{ padding: 2 }}
              spacing={2}
            >
              <Grid item>
                <Grid
                  spacing={1}
                  container
                  alignItems={"center"}
                  flexDirection={"row"}
                >
                  <Grid item>
                    <Info sx={{ color: yellow[700] }} />
                  </Grid>
                  <Grid item>
                    <Typography>Application Information</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Table size="small" stickyHeader={false}>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: "none" }}>Version</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {appConfig.applicationInformation.version}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: "none" }}>Name</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {appConfig.applicationInformation.name}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: "none" }}>Hardware ID</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {appConfig.applicationInformation.hardwareId}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none" }}>Mac Address</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {appConfig.applicationInformation.macAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none" }}>IP Address</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      : {appConfig.applicationInformation.ipAddress}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  };
}
