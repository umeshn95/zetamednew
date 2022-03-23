import { React, useState } from 'react'
import './styles.scss'
import UpdateAppointment from './UpdateAppointment'
import axios from 'axios'
import { useAlert } from "react-alert";
import Loader from '../../Loading/Loader'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { patientAppointmentAction } from '../../../Actions/PatientAction';


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
                                    <h4 className='modal-title'>Modal title</h4>
                                </div>
                                <div className='modal-body'>
                                    <h1>Patient Appointment</h1>
                                    <div>
                                        <h1>Patient Name : {obj.patientName}</h1>
                                        <h1>Problem : {obj.title}</h1>
                                        <h1>Start Time : {dateFormate(obj.start)}</h1>
                                        <h1>End Time : {dateFormate(obj.end)}</h1>
                                        <h1>Appointment Add Time : {obj.createAt}</h1>
                                    </div>
                                    <br />
                                    <div>
                                        <button onClick={() => updateAppointmentFunc()}>Change Appointment</button>
                                        <button onClick={() => deleteAppointment()}>Delete Appointment</button>
                                        <Link to={`/patient/${obj.patientId}`} ><button>Full Patient Info</button></Link>
                                        <br />
                                        <input type="checkbox"  name="" value={checkbox} 
                                            onClick={() => checkBoxFunc(checkbox ? true : false)}
                                        />
                                        <label > Is Appointment Done</label>
                                        <br />

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

export default ViewAppointment










