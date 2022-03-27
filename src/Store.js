import { configureStore } from '@reduxjs/toolkit'
import { RegistrationReducer, ProfileReducer } from './Reducers/AuthenticationReducers'
import { 
    PatientReducer, PatientGroupReducer, PatientSingleReducer,
    PatientAppointmentReducer, PatientSearchReducer, AppointmentSearchReducer
} from './Reducers/PatientReducers'


const Store = configureStore({
    reducer : {
        // user Authentication
        user : RegistrationReducer,
        profile : ProfileReducer,

        // Patient
        patient : PatientReducer,
        patientGroup : PatientGroupReducer,
        patientSingle : PatientSingleReducer,
        patientAppointment : PatientAppointmentReducer,
        patientSearch : PatientSearchReducer,
        appointmentSearch : AppointmentSearchReducer,

        // model
    } 
})

export default Store