import { createReducer, } from '@reduxjs/toolkit'
import {
    SUCCESS_REGISTRATION,
} from '../Constants/AuthenticationConstants'

import {
    REQUEST_PROFILE,
    SUCCESS_PROFILE,
    FAIL_PROFILE,
} from '../Constants/AuthenticationConstants'

const initialStateUser = {
    user : []
}

const initialStateProfile = {
    profile : []
}

export const RegistrationReducer = createReducer(initialStateUser, {

    [SUCCESS_REGISTRATION]: (state, action) => {
        state.user = action.payload
    },

})

export const ProfileReducer = createReducer(initialStateProfile, {

    [REQUEST_PROFILE]: (state) => {
        state.loading = true
    },

    [SUCCESS_PROFILE]: (state, action) => {
        state.profile = action.payload
        state.loading = false
    },

    [FAIL_PROFILE]: (state, action) => {
        state.profile = action.payload
        state.loading = false
    },

}) 