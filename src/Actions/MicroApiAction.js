import axios from "axios"
import {
    REQUEST_COUNTRY,
    SUCCESS_COUNTRY,
    FAIL_COUNTRY,
} from '../Constants/MicroApiConstants'


const userInfo = JSON.parse(localStorage.getItem('user-details'))

export const countryAction = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_COUNTRY })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/micro/get-county-state-city/`, config)
        dispatch({ type: SUCCESS_COUNTRY, payload: data })
    } catch (error) {
        dispatch({ type: FAIL_COUNTRY, payload: error.response.details })
    }
}