/* eslint-disable eqeqeq */
import React from "react";
import {
  Button,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import ProductModal from "../product/product-modal";
import ScalesCondition from "./scales-condition";
import {
  formValidateDefaultHandle,
  formValidateErrorHandle,
  meToast,
  onChangeHandle,
} from "../../../utils/helpers/call-helper";
import {
  KEY_SHIFT,
  KEY_USER,
  KEY_APPLICATION,
} from "../../../utils/constants/call-key-storage";
import RequestReport from "../../../utils/requests/report";
import SettingsStorage from "../../../utils/storages/settings-storage";
import { blue } from "@mui/material/colors";
import { OpenInNew } from "@mui/icons-material";

export default class ScalesFrom extends React.Component {
  static defaultProps = {
    router: {
      location: {},
      params: {},
      navigate: (to, options) => { },
    },
    activeScalesCondition: ScalesCondition.SCALES_CONDITION_DEFAULT,
    onClickTableRow: (product, index) => { },
    onSaveSuccess: response => { },
    onSaveFailed: error => { },
    netto: 0.0,
    tare: 0.0,
    gross: 0.0,
  };

  state = {
    product: {
      heavy: 0,
      id: 0,
      max_tolerance: 0,
      min_tolerance: 0,
      name: "",
      created_at: "",
      updated_at: "",
    },

    product_id: "",
    machine_number: "",
    tare: this.props.tare,
    formValidate: {
      product_id: [],
      machine_number: [],
    },
  };

  refProductModal = React.createRef();

  // event from input text
  onInputProductClick = () => {
    //   open table product modal
    this.refProductModal.open();
  };

  // event from table list modal
  onClickTableRow = (product, index) => {
    this.setState({ product, product_id: product.id });

    // parsing to props event on click table row product, from calculate scales condition
    this.props.onClickTableRow(product, index);

    // close table product modal
    this.refProductModal.close();
  };

  getDataForRequest = () => {
    const { machine_number, product_id } = this.state;
    const { netto, gross, activeScalesCondition: judgement } = this.props;
    const tare = this.state.tare != "" ? this.state.tare : this.props.tare;
    const { id: application_id } = JSON.parse(
      localStorage.getItem(KEY_APPLICATION)
    );
    const { id: user_id } = JSON.parse(localStorage.getItem(KEY_USER));
    const { id: shift_id } = JSON.parse(localStorage.getItem(KEY_SHIFT));

    const result = {
      machine_number,
      product_id,
      gross,
      tare,
      netto,
      judgement,
      shift_id,
      user_id,
      application_id,
    };

    return result;
  };

  onClickSaveButton = e => {
    e.preventDefault();

    formValidateDefaultHandle(this);
    return RequestReport.createNewReport(this.getDataForRequest())
      .then(response => {
        meToast("success", response.message);
        return this.props.onSaveSuccess(response);
      })
      .catch(err => {
        this.props.onSaveFailed(err);
        return err.handle(errorResponse => {
          formValidateErrorHandle(this, errorResponse);
        });
      });
  };

  onClickTareButton = () => {
    // todo handle click button tare code ...
  };

  onClickZeroButton = () => {
    // todo handle click button zero code ...
  };

  isActiveSaveButton = () => {
    // todo handle active button save code ...

    let { is_accept_all_condition } = SettingsStorage.getSettingApplication();

    let activeSttus = false;
    if (!is_accept_all_condition) {
      if (
        ScalesCondition.SCALES_CONDITION_OK == this.props.activeScalesCondition
      ) {
        activeSttus = true;
      }
    } else {
      activeSttus = true;
    }

    return activeSttus;
  };

  render = () => {
    return (
      <>
        {/* modal */}
        <ProductModal
          onClickTableRow={this.onClickTableRow}
          router={this.props.router}
          ref={ref => (this.refProductModal = ref)}
        />

        <Grid
          container
          py={3}
          px={2}
          component={"form"}
          flexDirection={"column"}
          onSubmit={this.onClickSaveButton}
          height="100%"
          justifyContent={"space-between"}
        >
          {/* content */}

          <Grid item>
            <Grid container flexDirection={"column"} spacing={5}>
              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  label="Nomor Mesin"
                  required
                  onChange={onChangeHandle(this, "machine_number")}
                  value={this.state.machine_number}
                  error={this.state.formValidate.machine_number.length > 0}
                  helperText={this.state.formValidate.machine_number.join(", ")}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  value={this.state.product.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        size="small"
                        color={"primary"}
                        onClick={this.onSearchIconClick}
                      >
                        <OpenInNew />
                      </IconButton>
                    ),
                  }}
                  InputAdd
                  required
                  onClick={this.onInputProductClick}
                  label="Produk"
                  error={this.state.formValidate.product_id.length > 0}
                  helperText={this.state.formValidate.product_id.join(", ")}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  label="Tare"
                  type="number"
                  onChange={onChangeHandle(this, "tare")}
                  value={this.state.tare}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              alignItems="end"
              justifyContent={"space-between"}
              spacing={2}
            >
              <Grid item sm={4}>
                <Button
                  size="small"
                  sx={{ backgroundColor: blue[900] }}
                  onClick={this.onClickTareButton}
                  fullWidth
                  variant="contained"
                >
                  Tare
                </Button>
              </Grid>
              <Grid item sm={4}>
                <Button
                  size="small"
                  sx={{ backgroundColor: blue[900] }}
                  onClick={this.onClickZeroButton}
                  fullWidth
                  variant="contained"
                >
                  Zero
                </Button>
              </Grid>
              <Grid item sm={4}>
                <Button
                  type="submit"
                  size="small"
                  sx={{ backgroundColor: blue[900] }}
                  disabled={!this.isActiveSaveButton()}
                  fullWidth
                  variant="contained"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
}
