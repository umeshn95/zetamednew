import { React, useState, useEffect, Fragment } from 'react'
import { patientGroupAction } from "../../Actions/PatientAction";
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from "react-alert";
import axios from 'axios';
import Loader from '../Loading/Loader';
import Grid from "@mui/material/Grid";


const UpdatePatientGroup = ({ match }) => {
    const alert = useAlert();
    const dispatch = useDispatch()
    const { loading, patientGroup } = useSelector((state) => state.patientGroup)

    const [cusLoading, setCusLoading] = useState("");

    const [disease, setDisease] = useState("");
    const [diseaseDiscription, setDiseaseDiscription] = useState("");

    const updatePatientGroupFunc = async () => {
        setCusLoading(true)
        const myForm = new FormData();
        myForm.set("disease", disease);
        myForm.set("diseaseDiscription", diseaseDiscription);
        const userInfo = JSON.parse(localStorage.getItem("user-details"));
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo && userInfo.access}`,
            },
        };
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-group/${match.params.id}/`, myForm, config);
        if (data.status === 202) {
            alert.success(data.details)
            dispatch(patientGroupAction())
        } else {
            alert.error(data.details)
        }
        // setCusLoading(false)
    }

    useEffect(() => {
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
        if (patientGroup && patientGroup.length !== 0) {
            setDisease(patientGroup && patientGroup.filter((e) => e.id === match.params.id)[0].disease)
            setDiseaseDiscription(patientGroup && patientGroup.filter((e) => e.id === match.params.id)[0].diseaseDiscription)
        }

    }, [dispatch, patientGroup, match.params.id])

    if (loading || cusLoading) {
        return (
            <Loader />
        )
    }

    return (
        <Fragment>
             <Grid container style={{ border: "1px solid #b4cef8" }}>
        <div className="zetamed_patient_list_heading">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container justify="center">
              <Grid item lg={6}>
                Patient Search
              </Grid>
              <Grid item lg={6} align="right">
                Add Patient
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className="zetamed_main_otp_actualinputs">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container justify="center">
              <Grid item xs={8} sm={9} md={11} lg={11} xl={11}>
               
              </Grid>

              <Grid item xs={4} sm={3} md={1} lg={1} xl={1} align="right">
             
              </Grid>

            </Grid>
          </Grid>
        </div>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          align="right"
          justify="center"
          style={{
            height: "30px",
            background: "#e5e5e5",
            marginTop: "15px",
          }}
        >

          <div className="small_text">Number of Patients: <span className="bold"></span></div>
        </Grid>
        <Grid
          container
          style={{ background: "#e5e5e5", padding: "2px" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
            <Grid container>
              <Grid item xs={5} sm={5} md={4} lg={4} xl={4}>
                <span className="bold">Patient</span>
              </Grid>
              <Grid item xs={5} sm={5} md={6} lg={6} xl={6} align='center'>
                <span className="bold">Details</span>

              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      

            <Grid 
              item
              xs={12}
              sm={12}
              md={12}
              lg={9}
              xl={9}
              style={{ padding: "10px" }}
            >
              <div className="zetamed_patient_list_details_card">
              
                <Grid container  style={{ padding: "2px" }}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={5} sm={5} md={4} lg={4} xl={6}>
                        <Grid container>
                       
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                               
                                       
                            <Grid container spacing={2} >
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Grid container style={{ padding: "4px" }}>
                                                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                                            <span className='bold'>Disease</span> : 
                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                                                            <input
                      className="zetamed_main_otp_actualinput"
                    type="text"
                    required
                    placeholder="Disease Name"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                />
                                                            </Grid>
                                                        </Grid>
                                                  
                                                       
                                
                                </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: "flex" }} >
                                                    <Grid container style={{ padding: "2px" }}>
                                                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                                            <span className='bold'>Disease <br></br>Discription</span> :
                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                                                            <input
                      className="zetamed_main_otp_actualinput"
                                                            
                    type="text"
                    required
                    placeholder="Disease Description"
                    value={diseaseDiscription}
                    onChange={(e) => setDiseaseDiscription(e.target.value)}
                />
                                                            </Grid>
                                                            </Grid>
                                                         
                
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                
                                </Grid>
                              
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align='right'>
                                
                                    
                                    </Grid>
                            </Grid>
                            </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} style={{marginTop:'15px'}} align='center' justify='center'>
                     

                               <div style={{padding:'4px'}}> <button className="custom-btn btn-6" onClick={() => updatePatientGroupFunc()}><span>Update Group</span></button></div>
                      </Grid>
                    
                    </Grid>
                  </Grid>
                </Grid>
                        
                         
              </div>
            </Grid>
       
      </Grid>
            
         
        </Fragment>

    )
}

export default UpdatePatientGroup