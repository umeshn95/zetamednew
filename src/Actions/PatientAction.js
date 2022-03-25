import axios from "axios"
import {
    // Patient list
    REQUEST_PATIENT,
    SUCCESS_PATIENT,
    FAIL_PATIENT,

    // Patient group
    REQUEST_PATIENT_GROUP,
    SUCCESS_PATIENT_GROUP,
    FAIL_PATIENT_GROUP,

    // Patinet Single
    REQUEST_PATIENT_SINGLE,
    SUCCESS_PATIENT_SINGLE,
    FAIL_PATIENT_SINGLE,

    // Patien Appintment
    REQUEST_PATIENT_APPOINTMENT,
    SUCCESS_PATIENT_APPOINTMENT,
    FAIL_PATIENT_APPOINTMENT,

    // Patien Search
    REQUEST_PATIENT_SEARCH,
    SUCCESS_PATIENT_SEARCH,
    FAIL_PATIENT_SEARCH,



} from '../Constants/PatientConstants'


const userInfo = JSON.parse(localStorage.getItem('user-details'))
const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }

export const patientAction = (page, filter) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT })
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/?query=${filter}&page=${page}`, config)
        dispatch({ type: SUCCESS_PATIENT, payload: data })
        console.log(data)
    } catch (error) {
        dispatch({ type: FAIL_PATIENT, payload: error.response.details })
    }
}

export const patientGroupAction = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT_GROUP })
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-group/`, config)
        dispatch({ type: SUCCESS_PATIENT_GROUP, payload: data })
    } catch (error) {
        dispatch({ type: FAIL_PATIENT_GROUP, payload: error.response.details })
    }
}


export const PatienSingleAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT_SINGLE })
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/${id}/`, config)
            .then((response) => 
            dispatch({ type: SUCCESS_PATIENT_SINGLE, payload: response.data })
        )
    } catch (error) {
        dispatch({ type: FAIL_PATIENT_SINGLE, payload: error.response.details })
    }
}


export const patientAppointmentAction = (page, filter) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT_APPOINTMENT })
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-appointment/?query=${filter}&page=${page}`, config)
        dispatch({ type: SUCCESS_PATIENT_APPOINTMENT , payload: data })
    } catch (error) {
        dispatch({ type: FAIL_PATIENT_APPOINTMENT , payload: error.response.details })
    }
}

export const patientSearchAction = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT_SEARCH })
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/search-patient/`, config)
        dispatch({ type: SUCCESS_PATIENT_SEARCH , payload: data })
    } catch (error) {
        dispatch({ type: FAIL_PATIENT_SEARCH , payload: error.response.details })
    }
}