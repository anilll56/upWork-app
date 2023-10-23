import { createSlice } from "@reduxjs/toolkit";

export const personSlice = createSlice({
  name: "person",
  initialState: {
    person: {
      authenticated: false,
      personInfo: {},
      token: "",
    },
  },
  reducers: {
    setPerson: (state, action) => {
      state.person.personInfo = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.person.authenticated = action.payload;
    },
  },
});

export const { setPerson, setAuthenticated } = personSlice.actions;

export default personSlice.reducer;
