import { createReducer } from "@reduxjs/toolkit"
import { HIDE_APPOINTMENT_FORM, SHOW_APPOINTMENT_FORM } from "../Constants/ModelConstants"



const initialAppointmentForm = {
    showapp:false
}

export const AppointMentFormReducer = createReducer(initialAppointmentForm, {
    [SHOW_APPOINTMENT_FORM]: (state, action) => {
        state.showapp = action.payload
    },
    [HIDE_APPOINTMENT_FORM]: (state, action) => {
        state.hideapp = action.payload
    }
    ,
  




})