import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  eventClear,
  setEventTitle,
  setStartDate,
  setEndDate,
  addEvent,
} from "../features/eventSlice";
// import { RRule, rrulestr } from "rrule";

const EventForm = ({ calendarRef }) => {
  const dispatch = useDispatch();
  // Retrieve data from the Redux store using the useSelector hook
  const { eventTitle, startDate, endDate } = useSelector(
    (state) => state.event
  );
  // Event title change handler
  const handleEventTitleChange = (e) => {
    dispatch(setEventTitle(e.target.value)); // Dispatch an action to update the event title in the Redux store
  };
  // Start date change handler
  const handleStartDateChange = (e) => {
    dispatch(setStartDate(e.target.value)); // Dispatch an action to update the start date in the Redux store
  };
  // End date change handler
  const handleEndDateChange = (e) => {
    dispatch(setEndDate(e.target.value)); // Dispatch an action to update the end date in the Redux store
  };

  const handleSubmit = () => {
    // Obtain the FullCalendar API from the calendarRef
    const calendarApi = calendarRef.current.getApi();

    const newEvent = {
      title: eventTitle,
      start: startDate,
      end: endDate,
    };
    // const rruleString =
    //   "DTSTART:20230509T183000Z;RRULE:FREQ=DAILY;INTERVAL=1;UNTIL=20230606T183000Z";
    // const rruleData = rrulestr(rruleString);
    // const newEvent = {
    //   title: "Recurring Event",
    //   rrule: {
    //     dtstart: rruleData.options.dtstart,
    //     freq: rruleData.options.freq,
    //     interval: rruleData.options.interval,
    //     count: rruleData.options.count,
    //     byday: rruleData.options.byday,
    //   },
    // };

    calendarApi.addEvent(newEvent);
    dispatch(addEvent(newEvent)); // Dispatch the addEvent action to update the events array
  };
  const handleClearEvents = () => {
    // Obtain the FullCalendar API from the calendarRef
    const calendarApi = calendarRef.current.getApi();

    // Clear existing events
    calendarApi.removeAllEvents();
    dispatch(eventClear()); // Dispatch the clear event action
  };
  return (
    <div>
      <form>
        <div className="mt-4 items-center">
          <div className="font-medium text-[#1b1b1b]">
            <label className="mr-4" htmlFor="eventTitle">
              Event Title
            </label>
          </div>
          <div>
            {/* input for event title */}
            <input
              type="text"
              id="eventTitle"
              value={eventTitle}
              onChange={handleEventTitleChange}
              className="shadow-lg rounded-lg px-5 py-2  w-full"
            />
          </div>
        </div>
        <div className="mt-4  items-center">
          <div className="font-medium text-[#1b1b1b]">
            <label className="mr-4" htmlFor="start-date">
              Start Date
            </label>
          </div>
          <div>
            <input
              type="date"
              id="startDate"
              value={startDate}
              placeholder="start Date"
              onChange={handleStartDateChange}
              className="shadow-lg rounded-lg px-5 py-2  w-full"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="font-medium text-[#1b1b1b]">
            <label className="mr-4" htmlFor="end-date">
              End Date
            </label>
          </div>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            className="shadow-lg rounded-lg px-5 py-2  w-full"
          />
        </div>
        <div className="mt-4 flex gap-4 justify-center">
          <button
            className="bg-black px-5 py-2 rounded-lg shadow-lg text-[#B0F3F1]"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-white px-5 py-2 rounded-lg shadow-lg text-black"
            type="button"
            onClick={handleClearEvents}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
