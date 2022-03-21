import { React, useState } from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
import UpdateAppointment from './UpdateAppointment'

const SingleAppointment = ({ obj,singalAppointmentCheck,setSingalAppointmentCheck }) => {
const [showmodal,setShowmodal] = useState(true)
    const [updateAppointmentCheck, setUpdateAppointmentCheck] = useState(false)

    const handleClose = () => {
        setSingalAppointmentCheck(false)    }
    const updateAppointmentFunc = () => {
        setUpdateAppointmentCheck(true)
    }

    return (
        <>
            {
               
                    
               singalAppointmentCheck ?

                        <div className='modal' onClick={() => handleClose()}>
                            <div className='modal-content' onClick={e => e.stopPropagation()}>
                                <div className='modal-header'>
                                    <h4 className='modal-title'>Modal title</h4>
                                </div>
                                <div className='modal-body'>
                                    <div>
                                        <div>Signal Appointment</div>
                                        <div>
                                            <h1> Patient Name : {obj.patientName}</h1>
                                            <h1>Titiel : {obj.title}</h1>
                                            <h1>startDate : {obj.startDate}</h1>
                                            <h1>endDate : {obj.endDate}</h1>
                                            <h1>Appointment Create : {obj.createAt}</h1>
                                        </div>
                                        <Link to={`/patient/${obj.patient}`}><button>Patient Info</button></Link>
                                        <button onClick={() => updateAppointmentFunc()} >Change Appoinment</button>
                                        <button>Delete Appoinment</button>
                                    </div>

                                </div>
                                <div className='modal-footer'>
                                    <button className='buttonclose' onClick={() => handleClose()}>Close </button>
                                    <div></div>
                                </div>
                        </div>
                      {  updateAppointmentCheck ? <UpdateAppointment setUpdateAppointmentCheck={setUpdateAppointmentCheck} updateAppointmentCheck={updateAppointmentCheck} obj={obj} />:''}
                        </div> : ''
            }

        </>
    )
}

export default SingleAppointment