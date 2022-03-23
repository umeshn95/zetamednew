import { React, useState } from 'react'
import './styles.scss'
import UpdateAppointment from './UpdateAppointment'
import axios from 'axios'
import { useAlert } from "react-alert";
import Loader from '../../Loading/Loader'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { patientAppointmentAction } from '../../../Actions/PatientAction';
import Grid from "@mui/material/Grid";


const ViewAppointment = ({ appointViewCheck, setAppointViewCheck, obj }) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const [cusLoading, setCusLoading] = useState(false)
    const [updateAppointmentCheck, setUpdateAppointmentCheck] = useState(false)
    const [conformation, setConformation] = useState("")

    const handleClose = () => {
        setAppointViewCheck(false)
    }


    const UpdateAppointmentFunc = async () => {
        setCusLoading(true)
        const userInfo = JSON.parse(localStorage.getItem('user-details'))
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        let check = '2'
        let item = { conformation, check }
        let { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-appointment/${obj.id}/`, item, config)
        if (data.status === 202) {
            setAppointViewCheck(false)
            dispatch(patientAppointmentAction())
            alert.success(data.details)
        } else {
            alert.error(data.details)
        }
        setCusLoading(false)
    }

    const deleteAppointment = () => {
        setCusLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("user-details"));
        const config = {
            headers: { Authorization: `Bearer ${userInfo && userInfo.token}` },
        };
        axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-appointment/${obj.id}/`,
            config
        )
            .then((response) => {
                if (response.data.status === 200) {
                    setAppointViewCheck(false)
                    dispatch(patientAppointmentAction())
                    alert.success(response.data.details);
                } else {
                    alert.error(response.data.details);
                }
            });
        setCusLoading(false);
    };

    const updateAppointmentFunc = () => {
        setUpdateAppointmentCheck(true)
    }

    if (cusLoading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            {
                updateAppointmentCheck ?
                    <UpdateAppointment
                        updateAppointmentCheck={updateAppointmentCheck}
                        setUpdateAppointmentCheck={setUpdateAppointmentCheck}
                        setAppointViewCheck={setAppointViewCheck}
                        obj={obj}
                    />
                    :
                    appointViewCheck ?
                        <div className='modal' onClick={() => handleClose()}>
                            <div className='modal-content' onClick={e => e.stopPropagation()}>
                                <div className='modal-header'>
                                    <Grid container >
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}><h4 className='modal-title'>Appointment Details</h4></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} align='right' style={{ cursor: 'pointer' }}><img onClick={() => handleClose()} alt="img" src="https://img.icons8.com/external-doodle-bomsymbols-/28/000000/external-close-doodle-web-design-device-set-2-doodle-bomsymbols-.png" /> </Grid>
                                    </Grid>
                                </div>
                                <div className='modal-body'>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><p className='normal_text'>Patient Name : <b>{obj.patientName}</b></p></Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><p className='normal_text'>Problem : <b>{obj.title}</b></p></Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><p className='normal_text'>Start Time : <b>{obj.start}</b></p></Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><p className='normal_text'>End Time : <b>{obj.end}</b></p></Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><p className='normal_text'>Appointment Add Time: <b>{obj.createAt}</b></p></Grid>
                                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4}><button className="custom-btn btn-6" onClick={() => updateAppointmentFunc()}>Update</button></Grid>
                                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4}> <button className="custom-btn btn-6" onClick={() => deleteAppointment()}>Delete </button></Grid>
                                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} align='center'>  <Link to={`/patient/${obj.patientId}`} ><button className="custom-btn btn-6">Full Info</button></Link></Grid>

                                    </Grid>

                                    <div>
                                        <br />
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div >Status</div>
                                            <h1>Current status : {obj.isAppointmentDone}</h1>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            {" "}
                                            <select  onChange={(e) => setConformation(e.target.value)}>
                                            <option value="Select">Select</option>
                                                <option value="Done">Done</option>
                                                <option value="Cancel">Cancel</option>
                                                <option value="Prossess">Prossess</option>
                                            </select>
                                            {conformation && conformation !== "Select"? 
                                            <div>
                                            <button onClick={() => UpdateAppointmentFunc()}>Save</button>
                                            </div>
                                            :
                                            ""
                                            }
                                        </Grid>
                                        <br />

                                    </div>
                                </div>
                                <div className='modal-footer'>

                                    <div></div>
                                </div>
                            </div>
                        </div> : ''
            }

        </>
    )
}

export default ViewAppointment










