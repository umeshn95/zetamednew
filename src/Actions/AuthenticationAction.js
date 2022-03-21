import axios from "axios";
import {
    SUCCESS_REGISTRATION,

    REQUEST_PROFILE,
    SUCCESS_PROFILE,
    FAIL_PROFILE,
} from '../Constants/AuthenticationConstants'

const userInfo = JSON.parse(localStorage.getItem('user-details'))

export const userProfileAction = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PROFILE })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/get-user-profile/`, config)
        dispatch({ type: SUCCESS_PROFILE, payload: data })
    } catch (error) {
        dispatch({ type: FAIL_PROFILE, payload: error.response.details })
    }
}

export const getUserData = () => async (dispatch) => {
    let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/check-user/${userInfo.token}/`)
    dispatch({ type: SUCCESS_REGISTRATION, payload: data })
}

