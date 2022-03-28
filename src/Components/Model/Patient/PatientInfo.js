import '../Appointment/styles.scss'
import { React, useEffect, useState } from "react";
import Loader from "../../Loading/Loader";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { PatienSingleAction, patientAction } from "../../../Actions/PatientAction";
import axios from "axios";
import { useAlert } from "react-alert";
import './styles.scss'
import UpdatePatient from '../../Model/Patient/UpdatePatient';

const PatientInfo = ({ patientInfoCheck, setPatientInfoCheck, id }) => {
    const [toggledetail, setToggledetails] = useState(1);
    const [runAction, setRunAction] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, patientSingle } = useSelector(
        (state) => state.patientSingle
    );

    const [updatePatientCheck, setUpdatePatientCheck] = useState(false);
    const [cusLoading, setCusLoading] = useState(false);


    useEffect(() => {
        if (
            runAction === true
        ) {
            dispatch(PatienSingleAction(id));
            setRunAction(false)
        } else {
            if (patientSingle && patientSingle.length === 0) {
                dispatch(PatienSingleAction(id));
            } else {
                if (patientSingle && patientSingle.data[0].id !== id) {
                    dispatch(PatienSingleAction(id));
                }
            }
        }
    }, [dispatch, patientSingle, runAction, id]);

    const deletePatient = (id) => {
        setCusLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("user-details"));
        const config = {
            headers: { Authorization: `Bearer ${userInfo && userInfo.token}` },
        };
        axios
            .delete(
                `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/${id}/`,
                config
            )
            .then((response) => {
                if (response.data.status === 200) {
                    sessionStorage.setItem("petientSignal", "3");
                    sessionStorage.setItem("petientSingleSignal", "3");
                    alert.success(response.data.details);
                    dispatch(patientAction(sessionStorage.getItem("page"), sessionStorage.getItem("query")))
                    setPatientInfoCheck(false)
                } else {
                    alert.error(response.data.details);
                }
            });
        // setCusLoading(false);
    };

    const handleClose = () => {
        setPatientInfoCheck(false)
    }

    const updatePatientFunc = (patientId) => {
        setUpdatePatientCheck(true)
    }

    if (loading || cusLoading) {
        return <Loader />;
    }

    return (
        <>
            {
                updatePatientCheck ?
                    <UpdatePatient
                        updatePatientCheck={updatePatientCheck}
                        setUpdatePatientCheck={setUpdatePatientCheck}
                        id={id}
                        setRunAction={setRunAction}
                    />
                    :
                    patientInfoCheck ?
                        <div className='modal' onClick={() => handleClose()}>
                            <div className='modal-content' onClick={e => e.stopPropagation()}>
                                <div className='modal-header'>
                                    <Grid container >
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}><h4 className='modal-title'>Add Patient</h4></Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} align='right' style={{ cursor: 'pointer' }}>
                                            <img onClick={() => handleClose()} alt="img" src="https://img.icons8.com/external-doodle-bomsymbols-/28/000000/external-close-doodle-web-design-device-set-2-doodle-bomsymbols-.png" /> </Grid>
                                    </Grid>
                                </div>
                                <div className='modal-body'></div>
                                <div>
                                    {loading === false &&
                                        patientSingle &&
                                        patientSingle.data.map((e, i) => (
                                            <div key={i}>
                                                
                                                <Grid container style={{ padding: "10px", marginTop: '20px' }}>
                                                    {toggledetail === 1 ? (
                                                        <>
                                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                                                <img
                                                                    style={{ height: "150px", width: "150px", borderRadius: "10px" }}
                                                                    src={`${process.env.REACT_APP_BACKEND_URL}${e.patientImage}`}
                                                                    alt="Avatar Preview"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                                <Grid container spacing={5}>
                                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                                        <div className='zetamed_add_patient_show_details'>
                                                                            <img src="https://img.icons8.com/stickers/20/000000/contact-card.png" alt='name' /><div style={{ alignSelf: "center" }}>{e.name}</div>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                                        <div className='zetamed_add_patient_show_details'>
                                                                            {e.gender === 'Female' ? <img src="https://img.icons8.com/stickers/40/000000/user-female-circle.png" alt='female' /> : <img src="https://img.icons8.com/stickers/20/000000/user-male-circle.png" alt='male' />}<div style={{ alignSelf: "center" }}>{e.gender}</div>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                        <div className='zetamed_add_patient_show_details'>
                                                                            <img src="https://img.icons8.com/external-line-colors-royyan-wijaya/20/000000/external-email-medical-stuff-line-colors-royyan-wijaya.png" alt='email' /><div style={{ alignSelf: "center" }}>{e.email}</div>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                                        <div className='zetamed_add_patient_show_details'>
                                                                            <img src="https://img.icons8.com/external-rabit-jes-flat-rabit-jes/20/000000/external-cake-birthday-and-party-rabit-jes-flat-rabit-jes.png" alt='bithday' /><div style={{ alignSelf: "center" }}>{e.age}</div>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                                                <Grid container spacing={4}>


                                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                                        <div s className='zetamed_add_patient_show_details'>
                                                                            <img src="https://img.icons8.com/doodle/20/000000/touchscreen-smartphone.png" alt='mobile' /><div style={{ alignSelf: "center" }}>{e.mobileNo}</div>
                                                                        </div>
                                                                    </Grid>
                                                                 
                                                                   

                                                                </Grid>
                                                            </Grid>
                                                            {/* medical history */}
                                                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                                                <Grid container spacing={4}>


                                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                                        <div className='zetamed_add_patient_show_details'>
                                                                            <img src="https://img.icons8.com/stickers/20/000000/treatment-plan.png" alt='medicalhistory' /><div style={{ alignSelf: "center" }}>{e.problem}</div>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                                        <div className='zetamed_add_patient_show_details'>
                                                                            <img src="https://img.icons8.com/stickers/20/000000/id-verified.png" alt='id' /><div style={{ alignSelf: "center" }}> {e.whichProof}</div>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                        <div className='zetamed_add_patient_show_details' >
                                                                            <img src="https://img.icons8.com/stickers/20/000000/pay-date.png" alt='createdate' /><div style={{ alignSelf: "center" }}>
                                                                                {e.createAt}</div>
                                                                        </div>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>

                                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align='center' justify='space-between' style={{
                                                                display: "flex", gap: "20px"
                                                            }}>


                                                                <button onClick={() => updatePatientFunc()} className="butons" style={{ marginTop: '20px', fontSize: '15px' }}>
                                                                    Update Patient
                                                                </button>
                                                                <button className="butons" style={{ marginTop: '20px', fontSize: '15px' }}
                                                                    onClick={() =>
                                                                        deletePatient(patientSingle && patientSingle.data[0].id)
                                                                    }
                                                                >
                                                                    <div className="left"></div>

                                                                    Delete Patient
                                                                    <div className="left"></div>

                                                                </button>
                                                            </Grid>
                                                        </>
                                                    ) : (
                                                        ""
                                                    )}

                                                </Grid>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className='modal-footer'>
                            </div>
                        </div>
                        :
                        ""
            }
        </>
    )
}

export default PatientInfo