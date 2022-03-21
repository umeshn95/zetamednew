import { React, useState, Fragment } from 'react'
import { useAlert } from "react-alert";
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  SUCCESS_REGISTRATION,
} from '../../Constants/AuthenticationConstants'
import Loader from '../Loading/Loader';


const Registration = () => {
  const alert = useAlert();
  const dispatch = useDispatch()
  const history = useHistory();
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') ? localStorage.getItem('firstName') : "")
  const [email, setEmail] = useState(localStorage.getItem('email') ? localStorage.getItem('email') : "")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [mobile, setMobile] = useState(localStorage.getItem('mobileNo') ? localStorage.getItem('mobileNo') : "")
  const [iAm, setIAm] = useState("")
  const [speciality, setSpeciality] = useState("")
  const [clinicName, setClinicName] = useState("")
  const [cusLoading, setCusLoading] = useState(false);


  const registrationFunc = async () => {
    let mobileNo = Number(mobile)
    let item = { firstName, email, password, mobileNo, iAm, speciality, clinicName }
    if (password.length < 8 || confirmPassword.length < 8) {
      return alert.error("Password should be 8 digit!")
    }
    if (password !== confirmPassword) {
      return alert.error("Password did not Match!")
    }
    setCusLoading(true)
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/user-register/`, item)
      .then((response) => {
        if (response.data.status === 202) {
          dispatch({
            type: SUCCESS_REGISTRATION,
            payload: response.data.data,
          })
          localStorage.setItem("user-details", JSON.stringify(response.data.data));
          localStorage.removeItem("mobileNo")
          localStorage.removeItem("email")
          localStorage.removeItem("firstName")
          alert.success(response.data.details)
          history.push('/')
          setCusLoading(false)
        } else {
          alert.error(response.data.details)
        }
        setCusLoading(false)
      })
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
          <div className="zetamed_main_otp_heading">ZetaMed Registration</div>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{ backgroundColor: "#EFF4FB", height: '900px' }}
      >
        <div className="zetamed_main_otp_reg">
          <div className="zetamed_main_otp_input" style={{ height: "130vh" }}>

            <Grid container style={{ padding: "50px" }} spacing={1.5}>
              {/* first name */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Full Name</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="text"
                  placeholder="Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>


              {/* last Name */}
              {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Last Name</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
         */}
              {/* doctor select */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">I'm</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <select className="zetamed_main_otp_actualinput" style={{ height: '40px' }} onChange={(e) => setIAm(e.target.value)}>
                  <option value="Select">Select</option>
                  <option value="Doctore">Doctor</option>
                  <option value="Other">Other</option>
                </select>
              </Grid>


              {/* clinic Name */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Clinic Name</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="text"
                  placeholder="Clinic Name"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                />
              </Grid>

              {/* speciality Name */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Speciality</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="text"
                  placeholder="Speciality"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Email</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="text"
                  disabled={localStorage.getItem('email') ? true : false}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              {/* Mobile No. */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Mobile Number</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="number"
                  placeholder="Verify Mobile No."
                  disabled={localStorage.getItem('mobileNo') ? true : false}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              {/* Pwd. */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Create Password</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="password"
                  placeholder="Create Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              {/*  confirm Pwd. */}
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
                  onClick={() => registrationFunc()}
                >
                  Register
                </button>

                {/* <div className=''>
          if allready verify otp so <Link to="/registration">click here</Link>
        </div> */}
                <div className="zetamed_otp_verfy_loginhere">
                  If Already Registered <Link to="/login">click here</Link> to Login      </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <Grid></Grid>
      </Grid>







      {/* <div>
        <div>Signin</div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <select onChange={(e) => setIAm(e.target.value)}>
          <option value="Select">Select</option>
          <option value="Doctore">Doctore</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        />

        <input
          type="text"
          placeholder="Clinic Name"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Verify Mobile No."
          disabled={localStorage.getItem('mobileNo') ? true : false}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
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
        <button onClick={() => registrationFunc()}>Submit</button>
      </div> */}
    </Fragment>
  )
}

export default Registration


