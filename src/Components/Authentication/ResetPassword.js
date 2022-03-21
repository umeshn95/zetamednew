import React, { Fragment, useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Loader from "../Loading/Loader";

const ResetPassword = ({ match }) => {
  let token = match.params.token;
  const alert = useAlert();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cusLoading, setCusLoading] = useState(false);

  const resetPassword = async () => {
    let item = { password, token };
    if (password.length < 8 || confirmPassword.length < 8) {
      return alert.error("Password should be 8 digit!");
    }
    if (password !== confirmPassword) {
      return alert.error("Password did not Match!");
    }
    setCusLoading(true)
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/password_reset/confirm/`, item)
        .then((response) => {
          if (response.status === 200) {
            alert.success("Your password reseted.");
            history.push("/login");
          } else {
            alert.error("Your password not reseted!!!");
          }
          setCusLoading(false)
        });
    } catch (error) {
      alert.error("fill strong and proper password!!!");
      setCusLoading(false)
    }
  };

  if (cusLoading) {
    return (
      <Loader />
    )
  }
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="zetamed_main_otp_heading">ZetaMed</div>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{ backgroundColor: "#EFF4FB" }}
      >
        <div className="zetamed_main_otp_reg">
          <div className="zetamed_main_otp_input">
            {/* full name */}

            <Grid container style={{ padding: "50px" }} spacing={1.5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">New Password</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="password"
                  placeholder="New Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              {/* email */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Confirm Password</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>

              {/* mobile number */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">&nbsp;</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <button
                  className="zetamed_otp_verify_button_css"
                  onClick={() => resetPassword()}
                >
                  Reset Password
                </button>



              </Grid>
            </Grid>
          </div>
        </div>
        <Grid></Grid>
      </Grid>


    </Fragment>
  );
};

export default ResetPassword;
