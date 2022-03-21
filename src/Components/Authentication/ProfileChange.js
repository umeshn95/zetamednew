import { React, useState, Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  userProfileAction,
  getUserData,
} from "../../Actions/AuthenticationAction";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useHistory } from 'react-router-dom'
import Loader from "../Loading/Loader";


const ProfileChange = () => {
  const userInfo = JSON.parse(localStorage.getItem("user-details"));
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  const alert = useAlert();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [imgSignal, setImageSignal] = useState();
  const [letestImg, setLetestImg] = useState("");
  const [cusLoading, setCusLoading] = useState(false);

  const updateProfileDataChange = (e) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImageSignal(true);
          setLetestImg(reader.result);
          setSelectedImage(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      setImageSignal(false);
    }
  };

  const changeProfile = async () => {
    setCusLoading(true)
    let id = user && user && user.data && user.data[0].id;
    let profileImage = selectedImage;
    const myForm = new FormData();
    myForm.set("firstName", firstName);
    myForm.set("speciality", speciality);
    myForm.set("clinicName", clinicName);
    if (imgSignal) {
      myForm.set("profileImage", profileImage);
    } else {
      let text =
        profile && profile && profile.data && profile.data[0].profileImage;
      let imageName = text.split("/media/")[1];
      myForm.set("imageName", imageName);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo && userInfo.access}`,
      },
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/authentication/user-profile-change/${id}/`,
      myForm,
      config
    );
    if (data.status === 202) {
      alert.success(data.details);
      dispatch(userProfileAction())
      dispatch(getUserData())
      history.push('/profile')
    } else {
      alert.error("not updated!");
    }
    setCusLoading(false)
  };

  useEffect(() => {
    if (profile && profile.length === 0) {
      dispatch(userProfileAction());
    }
    if (user && user.length === 0) {
      dispatch(getUserData());
    }
    const setFunction = () => {
      if (profile && profile.length !== 0) {
        setFirstName(user && user && user.data && user.data[0].first_name)
        setSpeciality(profile && profile && profile.data && profile.data[0] && profile.data[0].speciality)
        setClinicName(profile && profile && profile.data && profile.data[0] && profile.data[0].clinicName)
      }
    }
    setFunction()
  }, [dispatch, profile, user]);

  if (loading || cusLoading) {
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
      {profile &&
        profile.data &&
        profile.data.map((e) => (
          <div>
            <Grid container>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} align="center">
                <img
                  style={{
                    height: "250px",
                    width: "250px",
                    borderRadius: "50%",
                  }}
                  src={
                    imgSignal
                      ? letestImg
                      : `${process.env.REACT_APP_BACKEND_URL}${profile &&
                      profile &&
                      profile.data &&
                      profile.data[0].profileImage
                      }`
                  }
                  alt="Profile images"
                />
                <br />
                <input
                  style={{ "border": "5px solid #ccc", "display": "inline-block", "padding": "6px 12px", "cursor": "pointer" }}

                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                  placeholder='upload image'
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 288 288"
                >
                  <linearGradient
                    id="PSgrad_0"
                    x1="70.711%"
                    x2="0%"
                    y1="70.711%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stop-color="rgb(95,54,152)"
                      stop-opacity="1"
                    />
                    <stop
                      offset="100%"
                      stop-color="rgb(247,109,138)"
                      stop-opacity="1"
                    />
                  </linearGradient>
                  <path fill="url(#PSgrad_0)">
                    <animate
                      id="animation-to-check"
                      repeatCount="indefinite"
                      fill="freeze"
                      attributeName="d"
                      dur="50s"
                      values="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45
	c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2
	c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7
	c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z;
	
	
	M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4C145.2,62,145,49.9,173,43.4
	c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6
	c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8
	C48.9,198.6,57.8,191,51,171.3z;
	
	M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45
	c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2
	c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7
	c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z	"
                    />
                  </path>
                </svg>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={7}
                lg={7}
                xl={7}
                style={{ backgroundColor: "#EFF4FB" }}
              >
                <div className="zetamed_profile">
                  <div className="zetamed_profile_name">
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        Change Name{" "}
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {" "}
                        <input
                          className="zetamed_main_otp_actualinput"
                          type="text"
                          placeholder="Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />{" "}
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {" "}
                        Change Speciality
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {" "}
                        <input
                          className="zetamed_main_otp_actualinput"
                          type="text"
                          placeholder="Speciality"
                          value={speciality}
                          onChange={(e) => setSpeciality(e.target.value)}
                        />{" "}
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        Change Clinic Name{" "}
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {" "}
                        <input
                          className="zetamed_main_otp_actualinput"
                          type="text"
                          placeholder="Clinic Name"
                          value={clinicName}
                          onChange={(e) => setClinicName(e.target.value)}
                        />{" "}
                      </Grid>
                    </Grid>
                  </div>





                  <Link to='/profile'>
                    <button
                      className="zetamed_otp_verify_button_css"
                      style={{ marginTop: "50px" }}
                      onClick={() => changeProfile()}
                    >
                      Update Profile
                    </button>
                  </Link>

                </div>
              </Grid>
            </Grid>
          </div>
        ))}

      {/* <div>Profile Change</div>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
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

        <div>
          <img
            src={
              imgSignal
                ? letestImg
                : `${process.env.REACT_APP_BACKEND_URL}${
                    profile &&
                    profile &&
                    profile.data &&
                    profile.data[0].profileImage
                  }`
            }
            alt="Avatar Preview"
          />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={updateProfileDataChange}
          />
        </div>
        <br />
        <button onClick={() => changeProfile()}>Change Profile</button>
      </div> */}
    </Fragment>
  );
};

export default ProfileChange;
