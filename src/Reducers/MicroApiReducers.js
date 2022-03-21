import { createReducer, } from '@reduxjs/toolkit'
import {
    REQUEST_COUNTRY,
    SUCCESS_COUNTRY,
    FAIL_COUNTRY,
} from '../Constants/MicroApiConstants'

const initialStateCountry = {
    allCountry: []
}

export const countryReducer = createReducer(initialStateCountry, {

    [REQUEST_COUNTRY]: (state) => {
        state.loading = true
    },

    [SUCCESS_COUNTRY]: (state, action) => {
        state.allCountry = action.payload.data
        state.loading = false
    },

    [FAIL_COUNTRY]: (state, action) => {
        state.error = action.payload.data.details
        state.loading = false
    },

})








