/* eslint-disable jsx-a11y/alt-text */
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

import Logo from "../../../assets/images/logo.png";
import {
  formValidateDefaultHandle,
  formValidateErrorHandle,
  meToast,
  onChangeHandle,
} from "../../../utils/helpers/call-helper";
import RequestShift from "../../../utils/requests/shift";
import RequestAuth from "../../../utils/requests/auth";
import RequestUser from "../../../utils/requests/user";
import { blue } from "@mui/material/colors";
import appConfig from "../../../app.config";

export default class MeLogin extends React.Component {
  state = {
    shifts: [],
    shiftSelected: 0,
    users: [],
    username: "",
    password: "",
    formValidate: {
      username: [],
      password: [],
    },
  };

  // request get shifts
  getShifts = () => {
    return RequestShift.getPublicShifts().then(shifts => {
      this.setState({ shifts });
    });
  };

  // request get user
  getUsers = () => {
    return RequestUser.getPublicUsers().then(users => {

      // add super admin account
      const { name, username } = appConfig.accounts.superAdmin
      users.push({ name, username })

      this.setState({
        users,
        username: users.length > 0 ? users[0].username : "",
      })
    }
    );
  };

  componentDidMount = () => {
    // call request get shifts
    this.getShifts();
    // call request get users
    this.getUsers();
    // call check authenticate
  };

  onSubmit = e => {
    formValidateDefaultHandle(this);
    e.preventDefault();

    const { username, password, shifts, shiftSelected } = this.state;
    const shift = shifts[shiftSelected];

    return RequestAuth.login({ username, password, shift })
      .then(response => {
        meToast("success", "Login Success");

        // redirect to home
        this.props.router.navigate("/home");
      })
      .catch(err =>
        err.handle(response => {
          formValidateErrorHandle(this, response);
        })
      );
  };

  render = () => {
    return (
      <Grid
        container
        component={"form"}
        onSubmit={this.onSubmit}
        flexDirection={"column"}
        spacing={1.5}
      >
        <Grid item my={3}>
          <Grid container justifyContent={"center"}>
            <img width={"50%"} src={Logo} />
          </Grid>
        </Grid>
        <Grid item>
          <FormControl size="small" fullWidth>
            <InputLabel>Name</InputLabel>
            <Select
              value={this.state.username}
              onChange={onChangeHandle(this, "username")}
              label="Name"
            >
              {this.state.users.map((user, index) => {
                return (
                  <MenuItem key={index} value={user.username}>
                    {user.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            value={this.state.username}
            disabled={true}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            error={this.state.formValidate.username.length > 0}
            helperText={this.state.formValidate.username.join(", ")}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            fullWidth
            onChange={onChangeHandle(this, "password")}
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            error={this.state.formValidate.password.length > 0}
            helperText={this.state.formValidate.password.join(", ")}
          />
        </Grid>
        <Grid item>
          <FormControl size="small" fullWidth>
            <InputLabel>Shift</InputLabel>
            <Select
              onChange={onChangeHandle(this, "shiftSelected")}
              value={this.state.shiftSelected}
              label="Shift"
            >
              {this.state.shifts.map((shift, index) => {
                return (
                  <MenuItem key={index} value={index}>
                    {shift.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item mt={2}>
          <Button
            type="submit"
            sx={{ backgroundColor: blue[900] }}
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  };
}
