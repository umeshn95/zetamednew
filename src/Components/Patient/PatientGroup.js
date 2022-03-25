import { React, useEffect, Fragment, useState } from 'react'
import { patientGroupAction } from "../../Actions/PatientAction";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loading/Loader';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { useAlert } from "react-alert";
import Grid from "@mui/material/Grid";

const PatientGroup = () => {
    
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch()

    const { patientGroup, loading } = useSelector((state) => state.patientGroup)
    const [cusLoading, setCusLoading] = useState(false)
    const [data, setData] = useState("")
    const [value, setValue] = useState("")

    const deletePatientGroup = (id) => {
        setCusLoading(true)
        const userInfo = JSON.parse(localStorage.getItem('user-details'))
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-group/${id}/`, config)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(patientGroupAction())
                    alert.success(response.data.details)
                } else {
                    alert.error(response.data.details)
                }
            })
        // setCusLoading(false)
    }

    const groupWisedata = (id) => {
        sessionStorage.setItem("petientSignal", "4")
        sessionStorage.setItem("query", id)
        history.push("/patient")
    }

    const searchFilter = () => {
        setData(data && data.filter((e) => e.disease === value))
    }

    const allGroup = () => {
        setData(patientGroup && patientGroup) 
        setValue("")
    }

    useEffect(() => {
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
        if (patientGroup && patientGroup.length !== 0) {
            setData(patientGroup && patientGroup)
        }
    }, [dispatch, patientGroup,])

    if (cusLoading || loading) {
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
                                    <input type="text" value={value} 
                    className="zetamed_main_otp_actualinput"
                                        
                        onChange={(e) => setValue(e.target.value)}
                    />
                 
              </Grid>

              <Grid item xs={4} sm={3} md={1} lg={1} xl={1} align="right">
              <button onClick={() => searchFilter()}>
                  All Patient
                </button><button className="zetamed_patientlist_searchpatient" onClick={() => allGroup()}>
                  Search
                </button>
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
              {
                    data && data.map((e) =>
                        <>
                <Grid container  style={{ padding: "2px" }}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={5} sm={5} md={4} lg={4} xl={4}>
                        <Grid container>
                       
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                               
                                       
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                               <span  className='bold'> Disease:</span> {e.disease}
                                
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <span className='bold'>DiseaseDiscription</span> : {e.diseaseDiscription}
                                
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <span className='bold'>Create At</span> : {e.createAt}
                                
                                </Grid>
                              
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align='right'>
                                
                                    
                                    </Grid>
                            </Grid>
                            </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={8} style={{display:'flex',marginTop:'5px'}} align='center' justify='center'>
                     

                     <div style={{padding:'4px'}}> <Link to={`/patient-group-update/${e.id}`}>  <button className="custom-btn btn-6"><span>Update Group</span></button> </Link></div>
                               <div style={{padding:'4px'}}> <button className="custom-btn btn-6" onClick={() => deletePatientGroup()}><span>Delete Group</span></button></div>
                               <div style={{padding:'4px'}}> <button className="custom-btn btn-6" onClick={() => groupWisedata(e.id)}><span>Patient From This Group</span></button></div>
                      </Grid>
                    
                    </Grid>
                  </Grid>
                </Grid>
                        </>
                    )
                }
                         
              </div>
            </Grid>
       
      </Grid>
           
        </Fragment>
    )
}

export default PatientGroup

