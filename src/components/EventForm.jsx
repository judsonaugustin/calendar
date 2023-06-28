import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  eventClear,
  setEventTitle,
  setStartDate,
  setEndDate,
  addEvent,
} from "../features/eventSlice";
import { RRule } from "rrule";

const EventForm = ({ calendarRef }) => {
  const [errorMessage, setErrorMessage] = useState("");
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

    const rrule = new RRule({
      freq: RRule.WEEKLY,
      interval: 5,
      dtstart: new Date(startDate),
      until: new Date(endDate),
      byweekday: [0, 1, 2, 3, 4],
    });

    // Check if there are any recurring dates
    const recurringDates = rrule.all();

    if (recurringDates.length > 0) {
      // Create a new event with the first and last recurring dates
      const newEvent = {
        title: eventTitle,
        start: recurringDates[0].toISOString(), // Start date of the first recurring date
        end: recurringDates[recurringDates.length - 1].toISOString(), // End date of the last recurring date
      };
      // Add new event to the calendar
      calendarApi.addEvent(newEvent);
      // Dispatch an action to add the new event to Events
      dispatch(addEvent(newEvent));
    }
  };
  const handleButtonClick = () => {
    // Perform form validation here
    if (eventTitle && startDate && endDate) {
      handleSubmit();
      setErrorMessage("");
    } else {
      // Display an error message
      setErrorMessage("Please fill all the fields in the form");
    }
  };

  const handleClearEvents = () => {
    const calendarApi = calendarRef.current.getApi();

    calendarApi.removeAllEvents();
    dispatch(eventClear());
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
        {/* <div className="mt-4">
          <div className="font-medium text-[#1b1b1b]">
            <label className="mr-4" htmlFor="end-date">
              Weekends
            </label>
          </div>
        </div> */}
        {/* <input type="checkbox" /> */}
        <p className="text-center mt-2">{errorMessage}</p>
        <div className="mt-4 flex gap-4 justify-center">
          <button
            className="bg-black px-5 py-2 rounded-lg shadow-lg text-[#B0F3F1]"
            type="button"
            onClick={handleButtonClick}
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
