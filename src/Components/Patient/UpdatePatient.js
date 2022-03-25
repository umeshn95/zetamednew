import { Fragment, React, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { patientAction, patientGroupAction } from "../../Actions/PatientAction";
import { countryAction } from "../../Actions/MicroApiAction";
import Calendar from 'react-calendar';
import { useAlert } from "react-alert";
import { PatienSingleAction } from '../../Actions/PatientAction';
import Loader from "../Loading/Loader";
import Grid from "@mui/material/Grid";


const UpdatePatient = ({ match }) => {
    const alert = useAlert();
    const userInfo = JSON.parse(localStorage.getItem("user-details"));
    const { loading, patientSingle } = useSelector((state) => state.patientSingle)
    const { patient } = useSelector((state) => state.patient);
    const dispatch = useDispatch()
    const { allCountry } = useSelector((state) => state.allCountry)
    const { patientGroup } = useSelector((state) => state.patientGroup)

    const [selectedImage, setSelectedImage] = useState("");
    const [letestImg, setLetestImg] = useState("");
    const [imgSignal, setImageSignal] = useState();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [whichProof, setWhichProof] = useState("");
    const [proofId, setProofId] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [problem, setProblem] = useState("");
    const [problemDescription, setProblemDescription] = useState("");
    const [patientGroupp, setPatientGroupp] = useState("");
    const [calenderTrueFalse, setCalenderTrueFalse] = useState(false);

    const [cusLoading, setCusLoading] = useState(false);

    const updatePatientFunc = async (e) => {
        e.preventDefault();
        setCusLoading(true)
        if (age) {
            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("age", age);
            myForm.set("gender", gender);
            myForm.set("whichProof", whichProof);
            myForm.set("proofId", proofId);
            myForm.set("mobileNo", mobileNo);
            myForm.set("email", email);
            myForm.set("city", city);
            myForm.set("state", state);
            myForm.set("country", country);
            myForm.set("zipcode", zipcode);
            myForm.set("problem", problem);
            myForm.set("problemDescription", problemDescription);
            let patientGroup = patientGroupp
            myForm.set("patientGroup", patientGroup)
            let patientImage = selectedImage;
            myForm.set("patientImage", patientImage);


            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo && userInfo.access}`,
                },
            };
            const { data } = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/${match.params.id}/`, myForm, config);
            if (data.status === 201) {
                alert.success(data.details)
                sessionStorage.setItem("petientSignal", "2")
                sessionStorage.setItem("petientSingleSignal", "2")
            } else {
                alert.error(data.details)
            }
        } else {
            alert.error("Please Select D.O.B")
        }
        // setCusLoading(false)
    }

    const onDateChange = (newDate) => {
        let dateArray = new Date(newDate).toLocaleDateString().split("/")
        setAge(String(`${Number(dateArray[2])}-${Number(dateArray[0])}-${Number(dateArray[1])}`))
        setCalenderTrueFalse(false)
    }

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

    useEffect(() => {
        if (patient && patient.length === 0) {
            dispatch(patientAction(sessionStorage.getItem("page"), sessionStorage.getItem("query")));
          }
        if (allCountry && allCountry.length === 0) {
            dispatch(countryAction())
        }
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
        if (patientSingle && patientSingle.length === 0) {
            dispatch(PatienSingleAction(match.params.id))
        } else {
            if (patientSingle && patientSingle.data[0].id !== match.params.id) {
                dispatch(PatienSingleAction(match.params.id))
            }
        }
        setAge(loading === false ? patientSingle && patientSingle.data[0].age : "")
        setName(loading === false ? patientSingle && patientSingle.data[0].name : "")
        setGender(loading === false ? patientSingle && patientSingle.data[0].gender : "")
        setMobileNo(loading === false ? patientSingle && patientSingle.data[0].mobileNo : "")
        setEmail(loading === false ? patientSingle && patientSingle.data[0].email : "")
        setProblem(loading === false ? patientSingle && patientSingle.data[0].problem : "")
        setWhichProof(loading === false ? patientSingle && patientSingle.data[0].whichProof : "")
        setProofId(loading === false ? patientSingle && patientSingle.data[0].proofId : "")
        setCity(loading === false ? patientSingle && patientSingle.data[0].city : "")
        setState(loading === false ? patientSingle && patientSingle.data[0].state : "")
        setCountry(loading === false ? patientSingle && patientSingle.data[0].country : "")
        setZipcode(loading === false ? patientSingle && patientSingle.data[0].zipcode : "")
        setPatientGroupp(loading === false ? patientSingle && patientSingle.patientGroupId : "")
        setProblemDescription(loading === false ? patientSingle && patientSingle.data[0].problemDescription : "")

    }, [dispatch, loading, allCountry, patientGroup, patientSingle, match.params.id, patient])


    if (loading || cusLoading) {
        return (
            <Loader />
        )
    }

    let cityArray = []
    return (
        <Fragment>



{/* update patient */}


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
            onSubmit={updatePatientFunc}
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
                        placeholder="Full Name"
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
                                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9} style={{display:'flex'}}>
                                      <input
                                        //   style={{display:calenderTrueFalse ? 'none' : ''}}
                      className="zetamed_main_otp_actualinput"
                      type="text"
                      required
                      placeholder="Enter Full Name......"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                                      <button
                                          className="zetamed_add_patient_date_of_birth"
                                          style={{display:calenderTrueFalse ? 'none' : ''}}
                                          
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
              src={
                imgSignal
                    ? letestImg
                    : `${process.env.REACT_APP_BACKEND_URL}${loading === false ? patientSingle && patientSingle.data[0].patientImage : ""
                    }`
            }
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
                    <div className="zetamed_add_patient_name">Flat No.</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <input
                      className="zetamed_main_otp_actualinput"
                      required
                      type="email"
                      placeholder="Flat no./Room No."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                </Grid>
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
                    <div className="zetamed_add_patient_name">Street</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <input
                      className="zetamed_main_otp_actualinput"
                      required
                      type="email"
                      placeholder="Street"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                </Grid>
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
                    <div className="zetamed_add_patient_name">Country</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <select
                      className="zetamed_main_otp_actualinput"
                      style={{ height: "40px" }}
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Select Country..</option>
                      {allCountry &&
                        allCountry.map((e, i) => (
                          <option key={i} value={e.country}>
                            {e.country}
                          </option>
                        ))}
                    </select>
                  </Grid>
                </Grid>
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
                    <div className="zetamed_add_patient_name">State</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <select
                      className="zetamed_main_otp_actualinput"
                      style={{ height: "40px" }}
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">Select State</option>
                      {allCountry &&
                        allCountry
                          .filter((e) => e.country === country)
                          .map((p) =>
                            p.state.map((s) => (
                              <option key={s.id} value={s.state}>
                                {s.state}
                              </option>
                            ))
                          )}
                    </select>
                  </Grid>
                </Grid>
              </Grid>

              {/* select city */}
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
                    <div className="zetamed_add_patient_name">City</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <select
                      className="zetamed_main_otp_actualinput"
                      style={{ height: "40px" }}
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">City</option>
                      {console.log(
                        allCountry &&
                          allCountry.filter(
                            (e) =>
                              e.country === country &&
                              e.state.map((k) =>
                                k.state === state
                                  ? k.city.map((s) => cityArray.push(s.city))
                                  : ""
                              )
                          )
                      )}
                      {cityArray &&
                        cityArray.map((e, i) => (
                          <option key={i} value={e}>
                            {e}
                          </option>
                        ))}
                    </select>
                  </Grid>
                </Grid>
              </Grid>

              {/* zip code */}

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
                    <div className="zetamed_add_patient_name">Zip Code</div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                    <input
                      className="zetamed_main_otp_actualinput"
                      required
                      type="text"
                      placeholder="Zip Code"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
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
                          
                          {/* add patient to certain group */}
                        
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
                      Group
                    </div>
                  </Grid>
                  <Grid item xs={8.5} sm={9} md={10} lg={8} xl={9}>
                                      <select
                                                className="zetamed_main_otp_actualinput"
                                                style={{ height: "40px" }}
              required
              value={patientGroupp}
              onChange={(e) => setPatientGroupp(e.target.value)}
            >
              <option value="">Patient Group</option>
              {patientGroup &&
                patientGroup.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.disease}
                  </option>
                ))}
            </select>
                  </Grid>
                </Grid>
                          </Grid>


                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align='center' justify='center'>
                      
                      <button className="butons" type="submit" style={{marginTop:'7px',width:'40%'}}>
                                <div className="left"></div>

                                  Update Patient Details
                                  <div className="right"></div>

                            </button>
                      </Grid>


         
            

           
           
          </form>
        </Grid>

        
      </Grid>

















        </Fragment>
    )
}

export default UpdatePatient










            // <div>Update Patient</div> 
            // <div> 
            //     <form 
            //          encType="multipart/form-data" 
            //         onSubmit={updatePatientFunc} 
            //    > 
