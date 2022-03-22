import { React, useState } from 'react';
import './styles.scss'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import axios from 'axios'
import { useAlert } from "react-alert";
import Loader from '../../Loading/Loader';

const UpdateAppointment = ({ updateAppointmentCheck, setUpdateAppointmentCheck, obj }) => {
    const alert = useAlert();

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
        let item = { startDate, endDate, title }
        let { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-appointment/${obj.id}/`, item, config)
        if (data.status === 202) {
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
                                <h4 className='modal-title'>Modal title</h4>
                            </div>
                            <div className='modal-body'>
                                <div>
                                    <div>
                                        <input type="text"
                                            value={patientName}
                                            placeholder="Patient Name"
                                            onChange={(e) => setPatientName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input type="text"
                                            value={title}
                                            placeholder="Title"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <br />
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="Start Date"
                                                value={startDate}
                                                onChange={startDateFunc}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>

                                    <br />
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="End Date"
                                                value={endDate}
                                                onChange={endDateFunc}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <br />
                                    <button onClick={() => UpdateAppointmentFunc()}>Change Appointment</button>
                                </div>

                            </div>
                            <div className='modal-footer'>
                                <button className='buttonclose' onClick={() => handleClose()}>Close </button>
                                <div></div>
                            </div>
                        </div>
                    </div> : ''
            }

        </>
    )
}

export default UpdateAppointment

