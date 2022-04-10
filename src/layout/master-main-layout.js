/* eslint-disable eqeqeq */
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { blue, yellow } from "@mui/material/colors";
import React from "react";
import { Outlet } from "react-router-dom";

import MeBottomNavigation from "./partilas/me-bottom-navigation";
import MeHeaderNavigation from "./partilas/me-header-navigation";

class MasterMainLayout extends React.Component {
  state = {
    menuItems: [
      { label: "Product", to: "/home/master/product" },
      { label: "Operator", to: "/home/master/operator" },
      { label: "Shift", to: "/home/master/shift" },
    ],
  };

  isActiveMenuItem = pathname => {
    const currentPathname = this.props.router.location.pathname;

    if (
      currentPathname == "/home/master" &&
      pathname == "/home/master/product"
    ) {
      return true;
    }

    return currentPathname == pathname;
  };

  renderMenuItems = (menuItem, index) => {
    const isActiveMenuItem = this.isActiveMenuItem(menuItem.to);

    return (
      <ListItem key={index}>
        <Button
          variant={isActiveMenuItem ? "contained" : "text"}
          color="warning"
          onClick={() => this.props.router.navigate(menuItem.to)}
          sx={{
            justifyContent: "left",
            borderRadius: 2,
            backgroundColor: isActiveMenuItem ? yellow[700] : null,
          }}
          fullWidth
        >
          <Typography
            textTransform={"capitalize"}
            fontWeight={"bold"}
            color={isActiveMenuItem ? blue[900] : "white"}
          >
            {menuItem.label}
          </Typography>
        </Button>
      </ListItem>
    );
  };

  render = () => {
    return (
      <>
        <MeHeaderNavigation {...this.props} />

        <Grid container flexDirection={"row"}>
          <Grid md={2} sm={2} xs={2} item>
            <Box
              sx={{
                height: "90vh",
                backgroundColor: blue[900],
                position: "revert",
              }}
              bgcolor={"white"}
            >
              <List>{this.state.menuItems.map(this.renderMenuItems)}</List>
            </Box>
          </Grid>
          <Grid md={10} sm={10} xs={10} item>
            <Outlet />
          </Grid>
        </Grid>

        <MeBottomNavigation {...this.props} />
      </>
    );
  };
}

export default MasterMainLayout;
