import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { appointmentSearchAction } from '../../../Actions/PatientAction'
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import { useAlert } from "react-alert";
import Loader from '../../Loading/Loader'
import TextField from '@mui/material/TextField';

const AddPrescriptionHome = () => {
    const dispatch = useDispatch()
    const { appointmentSearch } = useSelector((state) => state.appointmentSearch)

    const [appointmetId, setAppointmetId] = useState("")
    useEffect(() => {
        if (appointmentSearch && appointmentSearch.length === 0) {
            dispatch(appointmentSearchAction())
        }
    }, [dispatch, appointmentSearch])

    return (
        <>
            <div>AddPrescriptionHome</div>
            <div>
                <Autocomplete
                    onChange={(event, newValue) => {
                        try {
                            setAppointmetId(newValue.id);
                        } catch (response) {
                            setAppointmetId("")
                        }

                    }}
                    options={appointmentSearch && appointmentSearch}
                    sx={{ width: 350 }}
                    renderInput={(params) => <TextField {...params} label="Patient Name" />}
                />
            </div>
        </>
    )
}

export default AddPrescriptionHome