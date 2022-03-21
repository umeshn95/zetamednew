import { SHOW_APPOINTMENT_FORM } from "../Constants/ModelConstants"


export const showAppointmentFormAction = (position)=> (dispatch) => {
    dispatch({type:SHOW_APPOINTMENT_FORM,payload:position})
}
export const hideAppointmentFormAction = (dispatch) => {
    dispatch({type:SHOW_APPOINTMENT_FORM,payload:false})
}