import { React, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DateNavigator,
  DayView,
  AppointmentTooltip,
  AllDayPanel,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import Loader from '../Loading/Loader'

import { useSelector, useDispatch } from 'react-redux'
import { patientAppointmentAction } from '../../Actions/PatientAction.js';
import { showAppointmentFormAction } from '../../Actions/ModelAction';
import EventModel from '../Model/EventModel';
import UpdateAppointment from '../Model/UpdateAppointment';
import SingleAppointment from '../Model/SingleAppointment';


const todaydate = () => {
  var date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-")
}


const AppointmentCalender = () => {
  const [showModel,setShowmodel] = useState(false)
  const dispatch = useDispatch()
  const { loading, patientAppointment } = useSelector((state) => state.patientAppointment)
  const { showApp } = useSelector((state) => state.showAppointment)
  const [currentDate, setCurrentDate] = useState(todaydate())
  const [currentView, setCurrentView] = useState('work-week')
  const [visible, setVisible] = useState()
  const [changevisible, setChangeVisible] = useState()
  const [appointmentMeta, setAppointmentMeta] = useState()

  const [singalData, setSingleDate] = useState("")

  const [addAppointment, setAddAppointment] = useState(false)
  const [singalAppointmentCheck, setSingalAppointmentCheck] = useState(false)


  const currentViewDate = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    setCurrentDate([date.getFullYear(), mnth, day].join("-"))
  }

  const currentViewNameChange = (str) => {
    setCurrentView(str)
  }

  const toggleVisibility = (str) => {
    // console.log(str) 
  }
  const changeVisibility = (str) => {
    setChangeVisible(str)
  }
  const dm = (str) => {
    console.log(str)
  }

  const onAppointmentMetaChange = (str) => {
    setSingleDate(str.data)
    // dispatch(showAppointmentFormAction(true))
    setSingalAppointmentCheck(true)
    // console.log(str)
  }

  const handleOpen = () => {
    setAddAppointment(true)
  }

  useEffect(() => {
    if (patientAppointment && patientAppointment.length === 0) {
      dispatch(patientAppointmentAction("", ""))
    }
  }, [dispatch, patientAppointment])

  if (loading) {
    return (
      <Loader />
    )
  }
  const appData = (str) => {
    console.log(str.data)
  }
  // console.log(singalData)
  console.log(changevisible)
  return (
    <>
      
      {
      
      
        <Paper>
            <SingleAppointment singalAppointmentCheck={singalAppointmentCheck} setSingalAppointmentCheck={setSingalAppointmentCheck}  obj={singalData}/>
           
            <Scheduler
              data={patientAppointment && patientAppointment.data}
            >
              <ViewState
                currentDate={currentDate}
                currentViewName={currentView}
                onCurrentDateChange={currentViewDate}
              onCurrentViewNameChange={currentViewNameChange}
            
              />

              <WeekView
              // startDayHour={8}
              // endDayHour={22}
              />
              <WeekView
                name="work-week"
                displayName="Work Week"
                excludedDays={[0, 6]}
              // startDayHour={9}
              // endDayHour={19}
              />
              <MonthView />
            <DayView
              onDoubleClick={dm}
            />

              <Toolbar />
              <DateNavigator />

              <ViewSwitcher />
              <AllDayPanel />
              <Appointments />
                <AppointmentTooltip
                  // showOpenButton
                  // showCloseButton
                  // visible={visible}
                  onVisibilityChange={toggleVisibility}
                  appointmentMeta={appointmentMeta}
                  onAppointmentMetaChange={onAppointmentMetaChange}
              />
              {/* <AppointmentForm  onVisibilityChange={changeVisibility} /> */}
            </Scheduler>
          </Paper>
      }

    </>
  )
}

export default AppointmentCalender