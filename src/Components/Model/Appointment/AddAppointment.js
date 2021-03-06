import { React, useState, useEffect } from 'react';
import './styles.scss'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { patientAppointmentAction, patientSearchAction } from '../../../Actions/PatientAction'
import axios from 'axios'
import { useAlert } from "react-alert";
import Loader from '../../Loading/Loader'
import Grid from "@mui/material/Grid";

const AddAppointment = ({ appointAddCheck, setAppointAddCheck, addObj, setAddObj }) => {

    const dispatch = useDispatch()
    const alert = useAlert();
    const { patientSearch } = useSelector((state) => state.patientSearch)

    const [cusLoading, setCusLoading] = useState(false)

    const todaydate = () => {
        var date = new Date(),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-")
    }


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

    const endDateViewDate = (str) => {
        var hours, minutes, seconds;
        var date = new Date(str),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        hours = ("0" + date.getHours()).slice(-2);
        minutes = ("0" + date.getMinutes()).slice(-2);
        seconds = ("0" + date.getSeconds()).slice(-2);

        var myHours = hours
        var modifyMinute = ''

        if (minutes === '00') {
            modifyMinute = 30
        } else {
            myHours = Number(myHours) + 1
            modifyMinute = '00'
        }

        var mySQLDate = [date.getFullYear(), month, day].join("-");
        var mySQLTime = [myHours, modifyMinute, seconds].join(":");
        return [mySQLDate, mySQLTime].join(" ");
    }

    // console.log(addObj.startDate)
    // console.log(currentViewDate(addObj.startDate))

    const [startDate, setStartDate] = useState(addObj.status ? currentViewDate(addObj.startDate) : todaydate());
    const [endDate, setEndDate] = useState(addObj.status ? endDateViewDate(addObj.startDate) : todaydate());
    const [patientId, setPatientId] = useState("");

    const startDateFunc = (start) => {
        setStartDate(currentViewDate(start));
    };

    const endDateFunc = (end) => {
        setEndDate(currentViewDate(end));
    };


    const addAppointmentFunc = async () => {
        // setCusLoading(true)
        const userInfo = JSON.parse(localStorage.getItem('user-details'))
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        let id = patientId
        let item = { id, startDate, endDate }
        let { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-appointment/`, item, config)
        if (data.status === 201) {
            setAppointAddCheck()
            setStartDate(todaydate())
            setEndDate(todaydate())
            setPatientId("")
            setAddObj({ status: false })
            dispatch(patientAppointmentAction())
            alert.success(data.details)
        } else {
            alert.error(data.details)
        }
        setCusLoading(false)
    }

    useEffect(() => {
        if (patientSearch && patientSearch.length === 0) {
            dispatch(patientSearchAction())
        }
    }, [dispatch, patientSearch])

    let rows = []
    patientSearch && patientSearch.forEach((item, index) => {
        rows.push({
            id: item.id,
            label: `Name : ${item.name}, Mobile No : ${item.mobileNo}`,
        });
    })

    const handleClose = () => {
        setAddObj({ status: false })
        setAppointAddCheck(false)
    }

    if (cusLoading) {
        return (
            <Loader />
        )
    }

    return (<>
        {
            appointAddCheck ?
                (<div className='modal' onClick={() => handleClose()}>
                    <div className='modal-content' onClick={e => e.stopPropagation()}>
                        <div className='modal-header'>
                            <Grid container >
                                <Grid item xl={6}><h4 className='modal-title'>Add Appointment</h4></Grid>
                                <Grid item xl={6} align='right' style={{ cursor: 'pointer' }}>
                                    <img onClick={() => handleClose()} alt="img" src="https://img.icons8.com/external-doodle-bomsymbols-/28/000000/external-close-doodle-web-design-device-set-2-doodle-bomsymbols-.png" /> </Grid>
                            </Grid>
                        </div>
                        <div className='modal-body'>
                            <div>
                                <div>
                                    <Autocomplete
                                        onChange={(event, newValue) => {
                                            try {
                                                setPatientId(newValue.id);
                                            } catch (response) {
                                                setPatientId("")
                                            }

                                        }}
                                        options={rows && rows}
                                        sx={{ width: 350 }}
                                        renderInput={(params) => <TextField {...params} label="Patient Name" />}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                    />
                                </div>
                                <br />

                                {patientId ? (<><button className="custom-btn btn-6">Patient Full Info</button> <br /></>) : ""}

                                <br />
                                <Grid container spacing={2}>
                                    <Grid item xl={6}>  <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="Start Date"
                                                value={startDate}
                                                onChange={startDateFunc}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div></Grid>
                                    <Grid item xl={6}>  <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="End Date"
                                                value={endDate}
                                                onChange={endDateFunc}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    </Grid>
                                    <Grid item xl={12} align='center'>   <button className="custom-btn btn-6" onClick={() => addAppointmentFunc()} ><span>Add Appointment</span></button></Grid>
                                </Grid>
                                <br />

                            </div>

                        </div>
                        <div className='modal-footer'>

                            <div></div>
                        </div>
                    </div>
                </div>
                ) : ''

        }

    </>
    )
}

export default AddAppointment

