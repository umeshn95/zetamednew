import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Lists from '@fullcalendar/list' // a plugin!
import TimeGrid  from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
const FullCalender = () => {
  return (
    <FullCalendar
    plugins={[ dayGridPlugin, Lists,TimeGrid,interactionPlugin ]}
          initialView="timeGridWeek"
          headerToolbar={{
              start: 'prev,next,today',
              center:"title",
            end: 'dayGridMonth,timeGridDay,timeGridWeek,list', // will normally be on the right. if RTL, will be on the left
          }}
          dateClick= {function(info)  {
            alert('clicked ' + info.dateStr);
          }}
          select= {function(info)  {
            alert('selected ' + info.startStr + ' to ' + info.endStr);
          }}
          slotMinTime="08:30:00"
          slotMaxTime='22:00:00'
          
  />
  )
}

export default FullCalender