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
    const [checkbox, setCheckbox] = useState()

    const handleClose = () => {
        setAppointViewCheck(false)
    }

    const checkBoxFunc = (c) => {
        setCheckbox(c)
    }
    console.log(checkbox)

    const dateFormate = (str) => {
        var hours, minutes, seconds;
        var date = new Date(str),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        hours = ("0" + date.getHours()).slice(-2);
        minutes = ("0" + date.getMinutes()).slice(-2);
        seconds = ("0" + date.getSeconds()).slice(-2);

        var mySQLDate = [date.getFullYear(), month, day].join("-");
        var mySQLTime = [hours, minutes, seconds].join(":");
        return [mySQLDate, mySQLTime].join(" ");
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
                        obj={obj}
                    />
                    :
                    appointViewCheck ?
                        <div className='modal' onClick={() => handleClose()}>
                            <div className='modal-content' onClick={e => e.stopPropagation()}>
                                <div className='modal-header'>
                                <Grid container >
                                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}><h4 className='modal-title'>Appointment Details</h4></Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} align='right' style={{cursor:'pointer'}}><img onClick={() => handleClose()} src="https://img.icons8.com/external-doodle-bomsymbols-/28/000000/external-close-doodle-web-design-device-set-2-doodle-bomsymbols-.png"/> </Grid>
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
                                        <input type="checkbox"  name="" value={checkbox} 
                                            onClick={() => checkBoxFunc(checkbox ? true : false)}
                                        />
                                        <label > Is Appointment Done</label>
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










