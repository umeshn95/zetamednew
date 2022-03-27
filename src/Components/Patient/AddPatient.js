import { Fragment, React, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import Grid from "@mui/material/Grid";
import { useAlert } from "react-alert";

const AddPatient = () => {
  const alert = useAlert();
  const userInfo = JSON.parse(localStorage.getItem("user-details"));
  const [selectedImage, setSelectedImage] = useState("");
  const [letestImg, setLetestImg] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [whichProof, setWhichProof] = useState("");
  const [proofId, setProofId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [problem, setProblem] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [calenderTrueFalse, setCalenderTrueFalse] = useState(false);


  const addPatientFunc = async (e) => {
    e.preventDefault();
    if (age) {
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("age", age);
      myForm.set("gender", gender);
      myForm.set("whichProof", whichProof);
      myForm.set("proofId", proofId);
      myForm.set("mobileNo", mobileNo);
      myForm.set("email", email);
      myForm.set("address", address);
      myForm.set("problem", problem);
      myForm.set("problemDescription", problemDescription);
      let patientImage = selectedImage;
      myForm.set("patientImage", patientImage);


      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo && userInfo.access}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/`, myForm, config);
      if (data.status === 201) {
        alert.success(data.details)
        setName("")
        setAge("")
        setGender("")
        setWhichProof("")
        setProofId("")
        setMobileNo("")
        setEmail("")
        setAddress("")
        setProblem("")
        setProblemDescription("")
        setSelectedImage("")
        setLetestImg("")
        sessionStorage.setItem("petientSignal", "1")
      } else {
        alert.error(data.details)
      }
    } else {
      alert.error("Please Select D.O.B")
    }
  }



  const onDateChange = (newDate) => {
    let dateArray = new Date(newDate).toLocaleDateString().split("/")
    setAge(String(`${Number(dateArray[2])}-${Number(dateArray[0])}-${Number(dateArray[1])}`))
    setCalenderTrueFalse(false)
  }
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setLetestImg(reader.result);
        setSelectedImage(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="zetamed_add_patient_new_patient">
            Add New Patient..
          </div>{" "}
          <hr />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ backgroundColor: "hsl(210, 80%, 42%)" }}
        >
          <div className="zetamed_add_patient_patirnt_entry">
            {" "}
            <img
              alt="avatar"
              src="https://img.icons8.com/stickers/50/000000/user.png"
            />{" "}
            Patient Entry
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="zetamed_add_patient_basic_information">
            {" "}
            Basic Information <hr />
          </div>
        </Grid>
        <Grid container>
          <form
            encType="multipart/form-data"
            onSubmit={addPatientFunc}
            style={{ width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ display: "flex" }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">Name</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <input
                      className="zetamed_main_otp_actualinput"
                      type="text"
                      required
                      placeholder="Enter Full Name......"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ display: "flex" }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">Gender</div>
                  </Grid>
                  <Grid item xs={9} sm={9} md={10} lg={8} xl={9}>
                    <select
                      className="zetamed_main_otp_actualinput"
                      style={{ height: "40px" }}
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="Select">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </Grid>
                </Grid>
              </Grid>

              {/*date of birth  */}


              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ display: "flex" }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name"
                    >D.O.B</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9} style={{ display: 'flex' }}>
                    <input
                      //   style={{display:calenderTrueFalse ? 'none' : ''}}
                      className="zetamed_main_otp_actualinput"
                      type="text"
                      required
                      placeholder="Date of Birth......"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <button
                      className="zetamed_add_patient_date_of_birth"
                      style={{ display: calenderTrueFalse ? 'none' : '' }}

                      onClick={() => setCalenderTrueFalse(calenderTrueFalse ? false : true)}
                    >

                    </button>
                    <div  >
                      {calenderTrueFalse ? (
                        <Calendar

                          onChange={onDateChange}
                          // value={age}
                          showNeighboringMonth={false}
                          locale={"en-US"}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ display: "flex" }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">ID Proof</div>
                  </Grid>
                  <Grid item xs={9} sm={9} md={10} lg={8} xl={9.2}>
                    <select
                      className="zetamed_main_otp_actualinput"
                      style={{ height: "40px" }}
                      required
                      value={whichProof}
                      onChange={(e) => setWhichProof(e.target.value)}
                    >
                      <option value="Select">Select</option>
                      <option value="Adhar">Adhaar</option>
                      <option value="Voter Id">Voter Id</option>
                      <option value="Driving LCS">Driving License</option>
                    </select>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ display: "flex" }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">ID Number</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <input
                      className="zetamed_main_otp_actualinput"
                      required
                      type="text"
                      placeholder="ID Number"
                      value={proofId}
                      onChange={(e) => setProofId(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* mobile number */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ display: "flex" }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">Mobile</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <input
                      className="zetamed_main_otp_actualinput"
                      required
                      type="text"
                      placeholder="Mobile No."
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Email */}

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ display: "flex" }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">Email</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <input
                      className="zetamed_main_otp_actualinput"
                      required
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* image upload start */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ display: "flex" }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">Patient Image</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <img
                      src={letestImg ? letestImg : ""}
                      alt={letestImg ? "Patient Images" : ""}
                    />
                    <input
                      style={{
                        border: "5px solid #ccc",
                        display: "inline-block",
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                      type="file"
                      name="Patient Images"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                      placeholder="upload image"
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* image upload end */}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_add_patient_basic_information">
                  Adress <hr />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">Full Address</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <input
                      className="zetamed_main_otp_actualinput"
                      required
                      type="textarea"
                      placeholder="Flat no./Room No."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>



              {/* medical information */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_add_patient_basic_information">
                  Medical Information <hr />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={1}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">
                      Medical History
                    </div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <input
                      className="zetamed_main_otp_actualinput"
                      required
                      type="text"
                      placeholder="Problem"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* problem description */}
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={1}
                    xl={2}
                    align="center"
                    justify="center"
                  >
                    <div className="zetamed_add_patient_name">
                      Problem Description
                    </div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <textarea
                      className="zetamed_main_otp_actualinput"
                      style={{ height: "100px" }}
                      required
                      type="textarea"
                      placeholder="Problem Discription"
                      value={problemDescription}
                      rows={4}
                      cols={50}
                      onChange={(e) => setProblemDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>

              </Grid>
            </Grid>


            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align='center' justify='center'>

              <button className="butons" type="submit" style={{ marginTop: '7px', width: '40%' }}>
                <div className="left"></div>

                Add Patient
                <div className="right"></div>

              </button>
            </Grid>







          </form>
        </Grid>


      </Grid>


    </Fragment>
  );
};

export default AddPatient;
