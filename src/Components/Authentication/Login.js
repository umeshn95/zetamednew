import { React, useState, Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

import { SUCCESS_REGISTRATION } from "../../Constants/AuthenticationConstants";
import Loader from "../Loading/Loader";

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cusLoading, setCusLoading] = useState(false);

  const LoginFunc = async () => {
    setCusLoading(true)
    let item = { username, password };
    // if (password.length < 8) {
    //   return alert.error("Password should be 8 digit!")
    // }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/user-login/`,item)
        .then((response) => {
          dispatch({
            type: SUCCESS_REGISTRATION,
            payload: response.data,
          });
          localStorage.setItem(
            "user-details",
            JSON.stringify(response.data)
          );
          alert.success("Login Successfully");
          history.push("/");
        });
        setCusLoading(false)
    } catch (error) {
      alert.error(error.response.data.detail);
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
                <div className="zetamed_main_otp_inputname">Email</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="email"
                  placeholder="Email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>

              {/* email */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Password</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

             

              {/* mobile number */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">&nbsp;</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              
                  <button
                    className="zetamed_otp_verify_button_css"
                    onClick={() => LoginFunc()}
                  >
                    Login
                  </button>
                
                {/* <div className=''>
          if allready verify otp so <Link to="/registration">click here</Link>
        </div> */}
                <div className="zetamed_otp_verfy_loginhere">
                 Forgot Your Password? <Link to="/password-reset-email">click here</Link>                 </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <Grid></Grid>
      </Grid>


      {/* vishesh code start */}
      {/* <div>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={() => LoginFunc()}>Login</button>
      </div> */}
    </Fragment>
  );
};

export default Login;
