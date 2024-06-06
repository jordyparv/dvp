import { createSlice } from "@reduxjs/toolkit";

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    _subjects: [],
    _error: null,
    _status: "idle",
  },
  reducers: {
    subjectSuccess : (state, action) => {
        state._subjects = action.payload;
        state._status = "success";
    },
    subjectFailed : (state, action) => {
        state._error = action.payload;
        state._status = "failed";
    },
  },
});

export const {subjectSuccess,subjectFailed } = subjectSlice.actions;
export default subjectSlice.reducer;;