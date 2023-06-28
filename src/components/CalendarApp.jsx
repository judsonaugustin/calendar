import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm";
import EventList from "./EventList";

const CalendarApp = () => {
  const calendarRef = useRef(null);
  // Retrieves the 'events' data from the Redux store
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    // Obtain the FullCalendar API from the calendarRef
    const calendarApi = calendarRef.current.getApi();
    // Remove all existing events from the calendar
    calendarApi.removeAllEvents();
    // Add the updated events from the Redux store to the calendar
    calendarApi.addEventSource(events);
  }, [events]); // Run this effect whenever the 'events' array changes

  return (
    <div className="bg-gradient-to-r from-[#B0F3F1] to-[#FFCFDF] h-screen">
      <div className="flex mx-4">
        <div className="w-1/4 px-3 py-4">
          <h3 className="text-3xl font-semibold text-center mt-4">
            Add Events
          </h3>
          <div className="mt-2">
            {/* Render the EventForm component and pass the 'calendarRef as a prop */}
            <EventForm calendarRef={calendarRef} />
          </div>
          {/* Render the EventList component and pass the 'events' array as a prop */}
          <EventList events={events} />
        </div>
        <div className="w-3/4 h-screen flex">
          <div className=" bg-white mt-auto mb-4 w-full py-4 px-4 border-t-8 border-yellow-200 rounded-3xl">
            <FullCalendar
              // plugins used in FullCalendar
              plugins={[
                rrulePlugin,
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
              // Set the initial view of the calendar to "dayGridMonth"
              initialView="dayGridMonth"
              // header toolbar customization
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              weekends={true}
              // allow to drag and drop
              editable={true}
              // allow events to select
              selectable={true}
              height={"90vh"}
              // Set the calendarRef as a ref to access the FullCalendar API
              ref={calendarRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
