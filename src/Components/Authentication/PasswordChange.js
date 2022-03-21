import React, { Fragment, useState } from "react";
import { useAlert } from "react-alert";
import axios from 'axios'
import Grid from "@mui/material/Grid";
import Loader from "../Loading/Loader";
const PasswordChange = () => {
    const alert = useAlert();
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cusLoading, setCusLoading] = useState(false);

    const updatePasswordSubmit = async () => {
        if (password.length < 8 || confirmPassword.length < 8) {
            return alert.error("Password should be 8 digit!")
        }
        if (password !== confirmPassword) {
            return alert.error("Password did not Match!")
        }
        setCusLoading(true)
        try {
            let old_password = oldPassword
            let new_password = password
            let item = { old_password, new_password }
            const userInfo = JSON.parse(localStorage.getItem('user-details'))
            const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/password-change/`, item, config)
                .then((response) => {
                    if (response.status === 200) {
                        alert.success("Your password Changed.")
                        setOldPassword("")
                        setPassword("")
                        setConfirmPassword("")
                    } else {
                        alert.error("Your password not Changed!!!")
                    }
                })
                setCusLoading(false)
        } catch (error) {
            if (error.response.status === 400){
                alert.error("Old Password is Wrong")
            } else{
              alert.error("fill strong and proper password!!!")
            }
            setCusLoading(false)
        }
    };

    if(cusLoading){
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
                <div className="zetamed_main_otp_inputname">Old Password</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Grid>

              {/* email */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">New Password</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
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
                  required
                  value={confirmPassword}
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
                    onClick={() => updatePasswordSubmit()}
                  >
                    Update Password
                  </button>
                
                {/* <div className=''>
          if allready verify otp so <Link to="/registration">click here</Link>
        </div> */}
                
              </Grid>
            </Grid>
          </div>
        </div>
        <Grid></Grid>
      </Grid>

            {/* <div >
                <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />
                <button onClick={() => updatePasswordSubmit()}>Change Password</button>

            </div> */}
        </Fragment>
    );
};

export default PasswordChange;