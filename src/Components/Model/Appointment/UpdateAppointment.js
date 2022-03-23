import { React, useState } from 'react';
import './styles.scss'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import axios from 'axios'
import { useAlert } from "react-alert";
import Loader from '../../Loading/Loader';
import { useDispatch } from 'react-redux'
import { patientAppointmentAction } from '../../../Actions/PatientAction';
import Grid from "@mui/material/Grid";


const UpdateAppointment = ({ updateAppointmentCheck, setUpdateAppointmentCheck, obj, setAppointViewCheck }) => {
    const alert = useAlert();
    const dispatch = useDispatch()

    const [cusLoading, setCusLoading] = useState(false)

    const currentViewDate = (str) => {
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

    const [startDate, setStartDate] = useState(obj.start);
    const [endDate, setEndDate] = useState(obj.end);
    const [patientName, setPatientName] = useState(obj.patientName);
    const [title, setTitle] = useState(obj.title);

    const startDateFunc = (start) => {
        setStartDate(currentViewDate(start));
    };

    const endDateFunc = (end) => {
        setEndDate(currentViewDate(end));
    };


    const UpdateAppointmentFunc = async () => {
        setCusLoading(true)
        const userInfo = JSON.parse(localStorage.getItem('user-details'))
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        let check = '1'
        let item = { startDate, endDate, patientName, check }
        let { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-appointment/${obj.id}/`, item, config)
        if (data.status === 202) {
            setUpdateAppointmentCheck(false)
            setAppointViewCheck(false)
            dispatch(patientAppointmentAction())
            alert.success(data.details)
        } else {
            alert.error(data.details)
        }
        setCusLoading(false)
    }

    const handleClose = () => {
        setUpdateAppointmentCheck(false)
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

                    <div className='modal' onClick={() => handleClose()}>
                        <div className='modal-content' onClick={e => e.stopPropagation()}>
                            <div className='modal-header'>
                            <Grid container >
                                    <Grid item xl={6}><h4 className='modal-title'>Update Appointment</h4></Grid>
                                    <Grid item xl={6} align='right' style={{cursor:'pointer'}}>
                                    <img onClick={() => handleClose()} alt="img"  src="https://img.icons8.com/external-doodle-bomsymbols-/28/000000/external-close-doodle-web-design-device-set-2-doodle-bomsymbols-.png" /> </Grid>
                            </Grid>
                            </div>
                            <div className='modal-body'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <TextField id="outlined-basic" label="Patient Name" variant="outlined"    value={title}
                                            placeholder="Patient Name"
                                            disabled={true}
                                            onChange={(e) => setTitle(e.target.value)}/>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <TextField id="outlined-basic" 
                                        label="Title" variant="outlined"    
                                        value={patientName}
                                            placeholder="Patient Title"
                                            onChange={(e) => setPatientName(e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="Start Date"
                                                value={startDate}
                                                onChange={startDateFunc}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                       
                                        
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="End Date"
                                                value={endDate}
                                                onChange={endDateFunc}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                       
                                        
                                    </Grid>
                                    <Grid align='center' item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <button className="custom-btn btn-6" onClick={() => UpdateAppointmentFunc()}>Update Now </button>
                                       
                                        
                                    </Grid>

                                </Grid>
                                <div>
                                </div>

                            </div>
                            <div className='modal-footer'>
                            </div>
                        </div>
                    </div> : ''
            }

        </>
    )
}

export default UpdateAppointment

