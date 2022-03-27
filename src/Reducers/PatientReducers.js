import { createReducer, } from '@reduxjs/toolkit'
import {
    // Patien list
    REQUEST_PATIENT,
    SUCCESS_PATIENT,
    FAIL_PATIENT,

    // Patien group
    REQUEST_PATIENT_GROUP,
    SUCCESS_PATIENT_GROUP,
    FAIL_PATIENT_GROUP,

    // Patien Single
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
    
    // Appointment Search
    REQUEST_APPOINTMENT_SEARCH,
    SUCCESS_APPOINTMENT_SEARCH,
    FAIL_APPOINTMENT_SEARCH,


} from '../Constants/PatientConstants'


const initialStatePatient = {
    patient: []
}

const initialStatePatientGroup = {
    patientGroup: []
}

const initialStatePatientSingle = {
    patientSingle: []
}

const initialStatePatientAppointment = {
    patientAppointment: []
}

const initialStatePatientSearch = {
    patientSearch: []
}

const initialStateAppointmentSearch = {
    appointmentSearch: []
}



// Patien list
export const PatientReducer = createReducer(initialStatePatient, {

    [REQUEST_PATIENT]: (state) => {
        state.loading = true
    },

    [SUCCESS_PATIENT]: (state, action) => {
        state.patient = action.payload
        state.loading = false
    },

    [FAIL_PATIENT]: (state, action) => {
        state.error = action.payload.data.details
        state.loading = false
    },

})

// Patien group
export const PatientGroupReducer = createReducer(initialStatePatientGroup, {

    [REQUEST_PATIENT_GROUP]: (state) => {
        state.loading = true
    },

    [SUCCESS_PATIENT_GROUP]: (state, action) => {
        state.patientGroup = action.payload.data
        state.loading = false
    },

    [FAIL_PATIENT_GROUP]: (state, action) => {
        state.error = action.payload.data.details
        state.loading = false
    },

})

// Patien Single
export const PatientSingleReducer = createReducer(initialStatePatientSingle, {

    [REQUEST_PATIENT_SINGLE]: (state) => {
        state.loading = true
    },

    [SUCCESS_PATIENT_SINGLE]: (state, action) => {
        state.patientSingle = action.payload
        state.loading = false
    },

    [FAIL_PATIENT_SINGLE]: (state, action) => {
        state.error = action.payload.data.details
        state.loading = false
    },
})

// Patien Appointment
export const PatientAppointmentReducer = createReducer(initialStatePatientAppointment, {

    [REQUEST_PATIENT_APPOINTMENT]: (state) => {
        state.loading = true
    },

    [SUCCESS_PATIENT_APPOINTMENT]: (state, action) => {
        state.patientAppointment = action.payload
        state.loading = false
    },

    [FAIL_PATIENT_APPOINTMENT]: (state, action) => {
        state.error = action.payload.data.details
        state.loading = false
    },

}) 

// Patien Appointment
export const PatientSearchReducer = createReducer(initialStatePatientSearch, {

    [REQUEST_PATIENT_SEARCH]: (state) => {
        state.loading = true
    },

    [SUCCESS_PATIENT_SEARCH]: (state, action) => {
        state.patientSearch = action.payload
        state.loading = false
    },

    [FAIL_PATIENT_SEARCH]: (state, action) => {
        state.error = action.payload.data.details
        state.loading = false
    },

}) 

// Appointment Search
export const AppointmentSearchReducer = createReducer(initialStateAppointmentSearch, {

    [REQUEST_APPOINTMENT_SEARCH]: (state) => {
        state.loading = true
    },

    [SUCCESS_APPOINTMENT_SEARCH]: (state, action) => {
        state.appointmentSearch = action.payload
        state.loading = false
    },

    [FAIL_APPOINTMENT_SEARCH]: (state, action) => {
        state.error = action.payload.data.details
        state.loading = false
    },

}) 
