/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import { Card, Grid, Typography } from "@mui/material";
import { green, grey, red, yellow } from "@mui/material/colors";
import React from "react";

export default class ScalesCondition extends React.Component {
  static SCALES_CONDITION_DEFAULT = null;
  static SCALES_CONDITION_HIGH = "high";
  static SCALES_CONDITION_OK = "ok";
  static SCALES_CONDITION_LOW = "low";

  static defaultProps = {
    active: ScalesCondition.SCALES_CONDITION_DEFAULT,
  };

  conditions = [
    {
      label: "HIGH",
      color: red[500],
      status: ScalesCondition.SCALES_CONDITION_HIGH,
    },
    {
      label: "OK",
      color: green[500],
      status: ScalesCondition.SCALES_CONDITION_OK,
    },
    {
      label: "LOW",
      color: yellow[500],
      status: ScalesCondition.SCALES_CONDITION_LOW,
    },
  ];

  renderCondition = (item, index) => {
    let activeColor = item.color;
    if (this.props.active != ScalesCondition.SCALES_CONDITION_DEFAULT) {
      if (this.props.active != item.status) {
        activeColor = grey[500];
      }
    }

    return (
      <Grid key={index} bgcolor={activeColor} p={0.5} item>
        <Grid
          container
          height={130}
          justifyContent={"center"}
          alignItems="center"
        >
          <Grid item>
            <Typography>{item.label}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  render = () => {
    return (
      <Grid container justifyContent={"flex-end"}>
        <Grid item>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              width: "100%",
            }}
          >
            <Grid container just flexDirection={"column"} color={"white"}>
              {this.conditions.map(this.renderCondition)}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  };
}
