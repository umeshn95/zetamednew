import { React, useState, useEffect } from 'react'
import Grid from "@mui/material/Grid";
import '../Appointment/styles.scss'
import './styles.scss'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from '../../../Actions/AuthenticationAction';

const AddPrescription = ({ prescriptionCheck, setPrescriptionCheck, setAppointViewCheck, obj }) => {
    const userInfo = JSON.parse(localStorage.getItem('user-details'))

    function todayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today
    }


    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile);

    const alert = useAlert()
    const drug = JSON.parse(localStorage.getItem("drug"))

    const [patientData, setPatientData] = useState([])
    const [printCheck, setPrintCheck] = useState(false)

    const [inputField, setInputField] = useState(
        [{
            "Dosage": "",
            "Unit": "0",
            "MorningDose": "Morning",
            "Instruction": "After Food",
            "Duration": "1 Day"
        }
        ]
    )

    const handleEvent = (index, event) => {
        const value = [...inputField]
        value[index][event.target.name] = event.target.value
        setInputField(value)
    }

    const handleEventTwo = (index, event) => {
        if (event === null) {
            return
        }
        if (drug.find(e => e === event)) {
            console.log("pass")
        } else {
            drug.push(event)
            localStorage.setItem("drug", JSON.stringify(drug))
        }
        const value = [...inputField]
        value[index]["Dosage"] = event
        setInputField(value)
    }


    const handleField = () => {
        setInputField([...inputField, {
            Dosage: '',
            Unit: '',
            MorningDose: '',
            Instruction: '',
            Duration: ''
        }])
    }
    const handleRemoveField = (event, index) => {
        const values = [...inputField]
        values.splice(index, 1)
        setInputField(values)
    }

    const savePresFunc = async (check) => {
        if (inputField[0]["Dosage"] === ""){
            alert.error("Please Select Drug")
            return
        }
        let item = {
            "appointmentId": obj.id,
            "jsonData": inputField
        }   
    const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        let { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/patient/add-prescription/`, item, config)
        if(check === '2'){
            setPrintCheck(true)
                prescrptionPrint()
            return 
        }
        if (data.status === 201) {
            alert.success(data.details)
        } else {
            alert.error(data.details)
        }
    }


    const prescrptionPrint = () => {
        // window.print()
    }

    const handleClose = () => {
        setPrescriptionCheck(false)
    }

    useEffect(() => {
        if (profile && profile.length === 0) {
            dispatch(userProfileAction());
        }
        const patientInfoFunc = async () => {
            let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/patient-info/${obj.patientId}/`, { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user-details')).token}` } })
            setPatientData(data)
        }
        patientInfoFunc()
    }, [dispatch, profile, obj.patientId])


    return (
        <>
            {
                prescriptionCheck ?
                    <div className='modal' onClick={() => handleClose()}>
                        <div className='modal-content' onClick={e => e.stopPropagation()}>
                            <div className='modal-header'>
                                <Grid container >
                                    <Grid item xl={6}><h4 className='modal-title'>Update Appointment</h4></Grid>
                                    <Grid item xl={6} align='right' style={{ cursor: 'pointer' }}>
                                        <img onClick={() => handleClose()} alt="img" src="https://img.icons8.com/external-doodle-bomsymbols-/28/000000/external-close-doodle-web-design-device-set-2-doodle-bomsymbols-.png" /> </Grid>
                                </Grid>
                            </div>
                            <div className='modal-body'>

                                <div className='prescription_main'>
                                    <div className='prescription_sub'>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Grid container align='center' spacing={1}>
                                                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                                                        <div className='zetamed_prescription_addprescription'>Add Prescription</div>
                                                    </Grid>
                                                    <h5>Clinic Name : {profile && profile.data && profile.data[0].clinicName}</h5>
                                                    <h5>Doctor Name : {userInfo.first_name}</h5>
                                                    <h5>Doctor email : {userInfo.email}</h5>
                                                    <h5>Date : {todayDate()}</h5>
                                                    <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2}>
                                                        <div className='zetamed_prescription_patientname'> <img alt='p1' src="https://img.icons8.com/ios-glyphs/12/000000/user--v1.png" />Patient Name</div>
                                                    </Grid>
                                                    <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2}>
                                                        <div className='zetamed_prescription_patientname'><img alt='p2' src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/12/000000/external-doctor-dental-kiranshastry-lineal-kiranshastry.png" />Doctor Name </div>
                                                    </Grid>
                                                    <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2}>
                                                        <div className='zetamed_prescription_patientname'><img alt='p3' src="https://img.icons8.com/ios/12/000000/calendar-plus.png" />Full Date</div>
                                                    </Grid>
                                                    <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2}>
                                                        <div className='zetamed_prescription_patientname'><img alt='p4' src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/12/000000/external-edit-interface-kiranshastry-lineal-kiranshastry-1.png" />Change</div>
                                                    </Grid>
                                                    <Grid item xs={3} sm={3} md={2.4} lg={2.4} xl={1.2} align='right'>
                                                        <div className=''> <img alt="img" src="https://img.icons8.com/external-doodle-bomsymbols-/28/000000/external-close-doodle-web-design-device-set-2-doodle-bomsymbols-.png" /></div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                                <Grid container>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: "flex", alignItems: "center" }}>
                                                        <div><img src="https://img.icons8.com/stickers/80/000000/user.png" alt='iconsuser' /></div>
                                                        <div className='zetamed_prescription_patientname1'>Patient Name {patientData && patientData[0] && patientData[0].name}</div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                        <div className='zetamed_prescription_mobile'> <img src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/19/000000/external-phone-notification-xnimrodx-lineal-gradient-xnimrodx.png" alt='phone' />
                                                            <div >Mobile {patientData && patientData[0] && patientData[0].mobileNo}</div>
                                                        </div>

                                                        <div className='zetamed_prescription_mobile'> <img src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/19/000000/external-email-contact-us-xnimrodx-lineal-gradient-xnimrodx-4.png" alt='email' /> email {patientData && patientData[0] && patientData[0].email}</div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            {!printCheck ? inputField.map((field, index) =>
                                                <>
                                                    {index >= 1 ? <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                                                        <Grid key={index} container>
                                                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                                                <Grid container>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                                                        <div >
                                                                            <Autocomplete
                                                                                id="free-solo-demo"
                                                                                value={field.Dosage}
                                                                                onChange={(event, newValue) => {
                                                                                    handleEventTwo(index, newValue)
                                                                                }}
                                                                                options={drug && drug}
                                                                                freeSolo
                                                                                // sx={{ width: 350 }}

                                                                                renderInput={(params) => <TextField {...params} label="Drug Name" />}
                                                                            />
                                                                        </div>

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>



                                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                                <Grid container>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table' >


                                                                        <div style={{ display: "flex", flexDirection: 'column', gap: "10px" }}>
                                                                            <div>
                                                                                <input className='zetamed_prescription_round' type='text' placeholder='Dosage(ex.10mg)' name="Unit" value={field.Unit} onChange={(event) => handleEvent(index, event)} >
                                                                                </input>

                                                                            </div>


                                                                            <div>
                                                                                <select className='zetamed_prescription_round1' type='text' placeholder='' name="MorningDose" value={field.MorningDose} onChange={(event) => handleEvent(index, event)} >
                                                                                    <option value="">Select</option>
                                                                                    <option value="Morning">Morning</option>
                                                                                    <option value="Afternoon">Afternoon</option>
                                                                                    <option value="Evening">Evening</option>

                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>



                                                            <Grid item xs={12} sm={12} md={2} lg={2.5} xl={2.5}>
                                                                <Grid container>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                                                        <select className='zetamed_prescription_round1' type='text' placeholder='Drug Name' name="Instruction" value={field.Instruction} onChange={(event) => handleEvent(index, event)} >
                                                                            <option value="">Select</option>
                                                                            <option value="Before Food">Before Food</option>
                                                                            <option value="After Food">After Food</option>

                                                                        </select>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>




                                                            <Grid item xs={12} sm={12} md={3} lg={2.5} xl={2.5}>
                                                                <Grid container>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                                                        <select className='zetamed_prescription_round1' type='text' placeholder='Drug Name' name="Duration" value={field.Duration} onChange={(event) => handleEvent(index, event)} >
                                                                            <option value="">Select</option>
                                                                            <option value="One Day">One Day</option>
                                                                            <option value="Two Day">Two Day</option>
                                                                            <option value="Three Day">Three Day</option>
                                                                            <option value="Four Day">Four Day</option>
                                                                            <option value="Five Day">Five Day</option>
                                                                            <option value="Six Day">Six Day</option>
                                                                        </select>
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                                                                <Grid container>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} onClick={() => handleField()}> <div className='zetamed_prescription_table'><img alt='pl' src="https://img.icons8.com/officel/20/000000/plus.png" /></div></Grid>
                                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} onClick={(index, event) => handleRemoveField(index, event)}> <div className='zetamed_prescription_table'><img alt='min' src="https://img.icons8.com/officel/20/000000/minus.png" /></div></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid> :


                                                        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                                                            <Grid container>
                                                                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                                                    <Grid container>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                                                                            <div className='zetamed_prescription_add_drug'>Drug</div>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                                                            <div >

                                                                                <Autocomplete
                                                                                    id="free-solo-demo"
                                                                                    value={field.Dosage}
                                                                                    onChange={(event, newValue) => {
                                                                                        handleEventTwo(index, newValue)
                                                                                    }}
                                                                                    options={drug && drug}
                                                                                    freeSolo
                                                                                    // sx={{ width: 350 }}

                                                                                    renderInput={(params) => <TextField {...params} label="Drug Name" />}
                                                                                />

                                                                            </div>

                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>



                                                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                                    <Grid container>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                                                                            <div className='zetamed_prescription_add_drug'>Dosage & Frequency</div>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table' >


                                                                            <div style={{ display: "flex", flexDirection: 'column', gap: "10px" }}>
                                                                                <div>
                                                                                    <input className='zetamed_prescription_round' type='text' placeholder='Dosage(ex.10mg)' name="Unit" value={field.Unit} onChange={(event) => handleEvent(index, event)} >
                                                                                    </input>

                                                                                </div>


                                                                                <div>
                                                                                    <select className='zetamed_prescription_round1' type='text' placeholder='' name="MorningDose" value={field.MorningDose} onChange={(event) => handleEvent(index, event)} >
                                                                                        <option value="">Select</option>
                                                                                        <option value="Morning">Morning</option>
                                                                                        <option value="Afternoon">Afternoon</option>
                                                                                        <option value="Evening">Evening</option>

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </Grid>

                                                                    </Grid>
                                                                </Grid>



                                                                <Grid item xs={12} sm={12} md={2} lg={2.5} xl={2.5}>
                                                                    <Grid container>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                            <div className='zetamed_prescription_add_drug'>Instruction</div>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                                                            <select className='zetamed_prescription_round1' type='text' placeholder='Drug Name' name="Instruction" value={field.Instruction} onChange={(event) => handleEvent(index, event)} >
                                                                                <option value="">Select</option>
                                                                                <option value="Before Food">Before Food</option>
                                                                                <option value="After Food">After Food</option>

                                                                            </select>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>




                                                                <Grid item xs={12} sm={12} md={3} lg={2.5} xl={2.5}>
                                                                    <Grid container>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                            <div className='zetamed_prescription_add_drug'>Duration</div>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='zetamed_prescription_table'>
                                                                            <select className='zetamed_prescription_round1' type='text' placeholder='Drug Name' name="Duration" value={field.Duration} onChange={(event) => handleEvent(index, event)} >
                                                                                <option value="">Select</option>
                                                                                <option value="One Day">One Day</option>
                                                                                <option value="Two Day">Two Day</option>
                                                                                <option value="Three Day">Three Day</option>
                                                                                <option value="Four Day">Four Day</option>
                                                                                <option value="Five Day">Five Day</option>
                                                                                <option value="Six Day">Six Day</option>
                                                                            </select>
                                                                        </Grid>
                                                                    </Grid>

                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                                                                    <Grid container>
                                                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                            <div className='zetamed_prescription_add_drug'>Add/Remove</div>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} onClick={() => handleField()}> <div className='zetamed_prescription_table'><img alt='plus' src="https://img.icons8.com/officel/20/000000/plus.png" /></div></Grid>
                                                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} onClick={(index, event) => handleRemoveField(index, event)}> <div className='zetamed_prescription_table'><img alt='minus' src="https://img.icons8.com/officel/20/000000/minus.png" /></div></Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>}

                                                </>
                                            ): <PrintComp data={inputField}/>}



                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <button className='button-66' onClick={() => savePresFunc("1")}>Save Prescription</button>
                                                <button className='button-66' onClick={() => savePresFunc("2")}>Save & Print Prescription</button>
                                            </Grid>
                                        </Grid>
                                    </div>

                                </div>
                            </div>
                            <div className='modal-footer'>
                            </div>
                        </div>
                    </div>
                    :
                    ""
            }
        </>
    )

}


export default AddPrescription


function PrintComp({ data }) {
    return(
        <>
            <div>
            {
                data.map((e, i) => 
                <div key={i}>
                    <h5>Dosage : {e.Dosage}</h5>
                    <h5>Duration : {e.Duration}</h5>
                    <h5>Instruction : {e.Instruction}</h5>
                    <h5>Doses Time : {e.MorningDose}</h5>
                    <h5>Unit : {e.Unit}</h5>
                    <hr />
                </div>
                )
            }
                
            </div>
        </>
    )
}
