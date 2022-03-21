import { React, Fragment, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./styles.css";
import Loader from '../Loading/Loader'


const Otp = () => {
  const alert = useAlert();
  const history = useHistory();
  const [otpInput, setOtpInput] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [otpNo, setOtpNo] = useState();
  const [mobile, setMobile] = useState();
  const [cusLoading, setCusLoading] = useState(false);

  const sendOtpRequest = () => {
    setCusLoading(true)
    let mobileNo = Number(mobile);
    let item = { mobileNo, email };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/send-otp/`,item)
      .then((response) => {
        if (response.data.status === 202) {
          setOtpInput(true);
          sessionStorage.setItem("mobileNo", mobileNo);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("firstName", firstName);
          alert.success(response.data.details);
        } else {
          if (response.data.status === 208) {
            history.push('/registration')
            alert.error(response.data.details);
          } else{
            alert.error(response.data.details);
          }        
        }
        setCusLoading(false)  
      });
  };


  const otpSubmit = () => {
    setCusLoading(true)
    let isOtp = Number(otpNo);
    let mobileNo = Number(sessionStorage.getItem("mobileNo"));
    let email = sessionStorage.getItem("email")
    let item = { isOtp, mobileNo, email };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/authentication/otp-verify/`,
        item
      )
      .then((response) => {
        if (response.data.status === 200) {
          localStorage.setItem("mobileNo", mobileNo);
          localStorage.setItem("email", email);
          localStorage.setItem("firstName", firstName);
          sessionStorage.removeItem("mobileNo");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("firstName");
          alert.success(response.data.details);
          setCusLoading(false)
          history.push('/registration')
          return;
        } else {
          alert.error(response.data.details);
        }
        setCusLoading(false)
      });
  };

  if(cusLoading){
    return (
      <Loader />
    )
  }

  return (
    <>
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
                <div className="zetamed_main_otp_inputname">Full Name</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="text"
                  placeholder="Full Name"
                  required
                  name="name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>

              {/* email */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Email</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="Email"
                  placeholder="Email"
                  required
                  name="number"
                  value={email}
                  // disabled={disMobile}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              {/* mobile number */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Mobile Number</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="number"
                  placeholder="Mobile No"
                  required
                  name="number"
                  value={mobile}
                  // disabled={disMobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              {/* Enter otp */}
              {otpInput ? (
                <>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="zetamed_main_otp_inputname">Enter OTP</div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {" "}
                    <input
                      className="zetamed_main_otp_actualinput"
                      type="number"
                      placeholder="Enter OTP"
                      required
                      name="number"
                      value={otpNo}
                      // disabled={disOtp}
                      onChange={(e) => setOtpNo(e.target.value)}
                    />
                  </Grid>
                </>
              ) : (
                ""
              )}

              {/* mobile number */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">&nbsp;</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                {otpInput ? <button className='zetamed_otp_verify_button_css' onClick={() => otpSubmit()}>Confirm OTP</button> : <button className='zetamed_otp_verify_button_css' onClick={() => sendOtpRequest()}>Continue</button>}
                {/* <div className=''>
          if allready verify otp so <Link to="/registration">click here</Link>
        </div> */}
                <div className='zetamed_otp_verfy_loginhere'>
                  If Already Registered <Link to="/login">click here</Link> to Login
                </div>
                <div>
                  <button onClick={() => sendOtpRequest()}>Resent Otp</button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <Grid>
        </Grid>
      </Grid>
      
    </>
  );
};
export default Otp;
