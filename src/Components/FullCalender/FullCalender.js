

import { React, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Lists from "@fullcalendar/list"; // a plugin!
import TimeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ViewAppointment from '../Model/Appointment/ViewAppointment'
import AddAppointment from '../Model/Appointment/AddAppointment'
import { useSelector, useDispatch } from 'react-redux'
import { patientAppointmentAction } from '../../Actions/PatientAction'
import Loader from '../Loading/Loader'

const FullCalender = () => {
  const dispatch = useDispatch()
  const { loading, patientAppointment } = useSelector((state) => state.patientAppointment)

  const [appointViewCheck, setAppointViewCheck] = useState(false)
  const [appointAddCheck, setAppointAddCheck] = useState(false)

  const [appointmentData, setAppointmentData] = useState("")
  const [addObj, setAddObj] = useState({status : false})

  const addAppointmentFunc = () => {
    setAppointAddCheck(true)
  }

  useEffect(() => {
    if (patientAppointment && patientAppointment.length === 0) {
      dispatch(patientAppointmentAction())
    }
  }, [dispatch, patientAppointment])

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <div>
        {appointViewCheck ? <ViewAppointment
          appointViewCheck={appointViewCheck}
          setAppointViewCheck={setAppointViewCheck}
          obj={appointmentData}
        /> :
          appointAddCheck ?
            <AddAppointment
              appointAddCheck={appointAddCheck}
              setAppointAddCheck={setAppointAddCheck}
              addObj={addObj}
              setAddObj={setAddObj}
            />
            :
            ""
        }
      </div>
      <div>
        <button onClick={() => addAppointmentFunc()}>Add Appointment</button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, Lists, TimeGrid, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "prev,next,today",
          center: "title",
          end: "dayGridMonth,timeGridDay,timeGridWeek,list", // will normally be on the right. if RTL, will be on the left
        }}
        dateClick={function (info) {
          setAddObj({startDate : info.date, status : true})
          setAppointAddCheck(true)
        }}
        // select={function (info) {
          
        //   alert("selected " + info.startStr + " to " + info.endStr);
        // }}
        slotMinTime="08:30:00"
        slotMaxTime="22:00:00"
        events={patientAppointment && patientAppointment.data}

        eventClick={function (info) {
          setAppointViewCheck(true)
          let obj = {
            id: info.event._def.publicId,
            title: info.event._def.title,
            start: info.event._def.extendedProps.startDate,
            end: info.event._def.extendedProps.endDate,
            patientId: info.event._def.extendedProps.patient,
            patientName: info.event._def.extendedProps.patientName,
            isAppointmentDone: info.event._def.extendedProps.isAppointmentDone,
            createAt: info.event._def.extendedProps.createAt,
          }
          setAppointmentData(obj)

          // change the border color just for fun
          info.el.style.borderColor = "red";
        }}
        editable={true}
        startEditable={true}
        durationEditable={true}
        eventDisplay="block"
      // eventBackgroundColor='green'
      />
    </>

  );
};

export default FullCalender;
