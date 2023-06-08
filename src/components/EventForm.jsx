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
  const { eventTitle, startDate, endDate } = useSelector(
    (state) => state.event
  );

  const handleEventTitleChange = (e) => {
    dispatch(setEventTitle(e.target.value));
  };

  const handleStartDateChange = (e) => {
    dispatch(setStartDate(e.target.value));
  };

  const handleEndDateChange = (e) => {
    dispatch(setEndDate(e.target.value));
  };

  const handleSubmit = () => {
    const calendarApi = calendarRef.current.getApi();

    const rrule = new RRule({
      freq: RRule.DAILY,
      dtstart: new Date(startDate),
      until: new Date(endDate),
    });

    const recurringDates = rrule.all();

    if (recurringDates.length > 0) {
      const newEvent = {
        title: eventTitle,
        start: recurringDates[0].toISOString(),
        end: recurringDates[recurringDates.length - 1].toISOString(),
      };

      console.log(newEvent);

      calendarApi.addEvent(newEvent);
      dispatch(addEvent(newEvent));
    }
  };
  const handleButtonClick = () => {
    // Perform form validation here
    if (eventTitle && startDate && endDate) {
      handleSubmit();
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
