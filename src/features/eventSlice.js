import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventTitle: "",
  startDate: "",
  endDate: "",
  events: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventTitle: (state, action) => {
      state.eventTitle = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    eventClear: () => initialState,
  },
});

export const { setEventTitle, setStartDate, setEndDate, addEvent, eventClear } =
  eventSlice.actions;
export default eventSlice.reducer;
