import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert';
import Grid from "@mui/material/Grid";
import axios from 'axios'
import Loader from '../Loading/Loader';

const ResetPasswordEmail = () => {
  const alert = useAlert();
  const [email, setEmail] = useState("")
  const [cusLoading, setCusLoading] = useState(false);

  const sendPasswordReset = async () => {
    setCusLoading(true)
    let item = { email }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/password_reset/`, item)
        .then((response) => {
          if (response.status === 200) {
            setEmail("")
            alert.success("Please Check your Email")
          }
          setCusLoading(false)
        })
    } catch (error) {
      alert.error(error.response.data.email[0])
      setCusLoading(false)
    }
  }

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
                <div className="zetamed_main_otp_inputname">Email</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>



              {/* mobile number */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">&nbsp;</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                <button
                  className="zetamed_otp_verify_button_css"
                  onClick={() => sendPasswordReset()}
                >
                  Send Password Reset Link
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

      {/* <h1>Password Resest</h1>
            <div>
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={sendPasswordReset}>Reset Password</button>
            </div> */}

    </Fragment>

  )
};

export default ResetPasswordEmail;
