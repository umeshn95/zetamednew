import { React, useEffect, Fragment, useState } from "react";
import Loader from "../Loading/Loader";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { PatienSingleAction } from "../../Actions/PatientAction";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import './styles.scss'
const PatientInfo = ({ match }) => {
  const [toggledetail, setToggledetails] = useState(1);
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, patientSingle } = useSelector(
    (state) => state.patientSingle
  );
  const [cusLoading, setCusLoading] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem("petientSingleSignal") === "2" ||
      sessionStorage.getItem("petientSingleSignal") === "3"
    ) {
      dispatch(PatienSingleAction(match.params.id));
      sessionStorage.removeItem("petientSingleSignal");
    } else {
      if (patientSingle && patientSingle.length === 0) {
        dispatch(PatienSingleAction(match.params.id));
      } else {
        if (patientSingle && patientSingle.data[0].id !== match.params.id) {
          dispatch(PatienSingleAction(match.params.id));
        }
      }
    }
  }, [dispatch, patientSingle, match.params.id]);

  const deletePatient = (id) => {
    setCusLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("user-details"));
    const config = {
      headers: { Authorization: `Bearer ${userInfo && userInfo.token}` },
    };
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/${id}/`,
        config
      )
      .then((response) => {
        if (response.data.status === 200) {
          sessionStorage.setItem("petientSignal", "3");
          sessionStorage.setItem("petientSingleSignal", "3");
          alert.success(response.data.details);
          history.push("/patient");
        } else {
          alert.error(response.data.details);
        }
      });
    setCusLoading(false);
  };

  if (loading || cusLoading) {
    return <Loader />;
  }
  return (
    <Fragment>
      {loading === false &&
        patientSingle &&
        patientSingle.data.map((e, i) => (
          <div key={i}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <div>
                  {" "}
                            {e.name} {e.gender} { e.age}<hr />{" "}
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={2.4}
                xl={2.4}
                align="center"
                        onClick={() => setToggledetails(1)}
              >
                <div className="bwrapper">

	<div  className={toggledetail===1?'bbutton _3':'bbutton _2'}>
		<span>Overview</span><div className="back"></div>
	</div>

</div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={2.4}
                xl={2.4}
                        align="center"
                onClick={() => setToggledetails(2)}
              >
                              <div className="bwrapper">

<div className={toggledetail===2?'bbutton _3':'bbutton _2'}>
  <span>Appointment</span><div className="back"></div>
</div>

</div>

              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={2.4}
                xl={2.4}
                        align="center"
                        
                onClick={() => setToggledetails(3)}
              >
                               <div className="bwrapper">

<div className={toggledetail===3?'bbutton _3':'bbutton _2'}>
  <span>Treatment</span><div className="back"></div>
</div>

</div>
                
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={2.4}
                xl={2.4}
                        align="center"
                       
                        
                onClick={() => setToggledetails(4)}
                    >
                              <div className="bwrapper">

<div className={toggledetail===4?'bbutton _3':'bbutton _2'}>
  <span>Prescription</span><div className="back"></div>
</div>

</div>
                        
                
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={2.4}
                xl={2.4}
                        align="center"
                        
                onClick={() => setToggledetails(5)}
              >
                             <div className="bwrapper">

<div className={toggledetail===5?'bbutton _3':'bbutton _2'}>
  <span>Clinic Notes</span><div className="back"></div>
</div>

</div>
              
              </Grid>
            </Grid>
            <Grid container style={{padding:"10px",marginTop:'20px'}}>
              {toggledetail === 1 ? (
                <>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                    <img
                      style={{ height: "250px", width: "250px",borderRadius:"10px" }}
                      src={`${process.env.REACT_APP_BACKEND_URL}${e.patientImage}`}
                      alt="Avatar Preview"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div  className='zetamed_add_patient_show_details'>
                      <img src="https://img.icons8.com/stickers/40/000000/contact-card.png" alt='name'/><div style={{alignSelf:"center"}}>{e.name}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div  className='zetamed_add_patient_show_details'>
                                            {e.gender==='Female'?<img src="https://img.icons8.com/stickers/40/000000/user-female-circle.png" alt='female'/>:<img src="https://img.icons8.com/stickers/40/000000/user-male-circle.png" alt='male'/> }<div style={{alignSelf:"center"}}>{e.gender}</div>
                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div  className='zetamed_add_patient_show_details'>
                        <img src="https://img.icons8.com/external-line-colors-royyan-wijaya/40/000000/external-email-medical-stuff-line-colors-royyan-wijaya.png" alt='email'/><div style={{alignSelf:"center"}}>{e.email}</div>
                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div  className='zetamed_add_patient_show_details'>
                      <img src="https://img.icons8.com/external-rabit-jes-flat-rabit-jes/40/000000/external-cake-birthday-and-party-rabit-jes-flat-rabit-jes.png" alt='bithday'/><div style={{alignSelf:"center"}}>{e.age}</div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Grid container spacing={4}>
                     
                     
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div s className='zetamed_add_patient_show_details'>
                      <img src="https://img.icons8.com/doodle/40/000000/touchscreen-smartphone.png" alt='mobile'/><div style={{alignSelf:"center"}}>{e.mobileNo}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div  className='zetamed_add_patient_show_details'>
                      <img src="https://img.icons8.com/stickers/40/000000/conference-call.png" alt='group'/><div style={{alignSelf:"center"}}> {patientSingle && patientSingle.patientGroup}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div  className='zetamed_add_patient_show_details'>
                      <img src="https://img.icons8.com/stickers/40/000000/place-marker.png" alt='location'/><div style={{ alignSelf: "center" }}>
                                                {e.city} &nbsp; {e.state}  &nbsp; {e.country}</div>
                        </div>
                      </Grid>
                      
                  </Grid>
                            </Grid>
                            {/* medical history */}
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Grid container spacing={4}>
                     
                     
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div className='zetamed_add_patient_show_details'>
                      <img src="https://img.icons8.com/stickers/40/000000/treatment-plan.png" alt='medicalhistory'/><div style={{alignSelf:"center"}}>{e.problem}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div className='zetamed_add_patient_show_details'>
                      <img src="https://img.icons8.com/stickers/40/000000/id-verified.png" alt='id'/><div style={{alignSelf:"center"}}> {e.whichProof}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div className='zetamed_add_patient_show_details' >
                      <img src="https://img.icons8.com/stickers/40/000000/pay-date.png" alt='createdate'/><div style={{ alignSelf: "center" }}>
                                                {e.createAt}</div>
                        </div>
                      </Grid>
                      
                  </Grid>
                            </Grid>
                            
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  align='center' justify='space-between' style={{
                                display:"flex",gap:"20px"}}>
                               
                               
              <button className="butons" style={{marginTop:'20px',fontSize:'15px'}}>
                <Link style={{textDecoration:'none' ,color:"white"}}
                  to={`/update-patient/${
                    patientSingle && patientSingle.data[0].id
                  }`}
                                        >
                                <div className="left"></div>
                                            
                                            Update patient
                                  <div className="right"></div>
                                            
                </Link>
              </button>
              <button className="butons" style={{marginTop:'20px',fontSize:'15px'}}
                onClick={() =>
                  deletePatient(patientSingle && patientSingle.data[0].id)
                }
                                    >
                                <div className="left"></div>
                                        
                                        Delete Patient
                                <div className="left"></div>
                                        
              </button>
              <button className="butons" style={{marginTop:'20px',fontSize:'16px'}}>
                <Link style={{textDecoration:'none' ,color:"white"}}
                  to={`/patient-group/${
                    patientSingle && patientSingle.patientGroupId
                  }`}
                                        >
                                <div className="left"></div>
                                            
                                            patient Group
                                <div className="left"></div>
                                            
                </Link>
              </button>
                  </Grid>
                </>
              ) : (
                ""
              )}
              {toggledetail === 2 ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  Appointment
                </Grid>
              ) : (
                ""
              )}
              {toggledetail === 3 ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  Treatment
                </Grid>
              ) : (
                ""
              )}
              {toggledetail === 4 ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  Prescription
                </Grid>
              ) : (
                ""
              )}
              {toggledetail === 5 ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  Clinical Notes
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </div>
        ))}

     
    </Fragment>
  );
};

export default PatientInfo;

// useEffect(() => {
//     if (patient && patient.length === 0) {
//         dispatch(patientAction())
//     }
//     const filterData = () => {
//         if (patient && patient.length !== 0) {
//         }
//         setData(patient && patient.data && patient.data.filter((e) => e.id === id));
//     }
//     filterData()

// }, [dispatch, patient, id])


// {loading === false &&
//     patientSingle &&
//     patientSingle.data.map((e, i) => (
//       <div key={i}>
//         <h1>D.O.B : {e.age}</h1>
//         <h1>Patient Name : {e.name}</h1>
//         <h1>Gender : {e.gender}</h1>
//         <h1>Mobile No. : {e.mobileNo}</h1>
//         <h1>email : {e.email}</h1>
//         <h1>Problem : {e.problem}</h1>
//         <h1>whichProof : {e.whichProof}</h1>
//         <h1>proofId : {e.proofId}</h1>
//         <h1>city : {e.city}</h1>
//         <h1>state : {e.state}</h1>
//         <h1>country : {e.country}</h1>
//         <h1>zipcode : {e.zipcode}</h1>
//         <h1>
//           Patient Group Name : {patientSingle && patientSingle.patientGroup}
//         </h1>
//         <h1>problemDescription : {e.problemDescription}</h1>
//         <h1>Registration Date : {e.createAt}</h1>
//         <img
//           src={`${process.env.REACT_APP_BACKEND_URL}${e.patientImage}`}
//           alt="Patient Img"
//         />
//         <br />
        
//       </div>
//     ))}