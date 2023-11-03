import { createSlice } from "@reduxjs/toolkit";

export const personSlice = createSlice({
  name: "person",
  initialState: {
    authenticated: false,
    info: {},
    token: "",
    optionsNames: [
      "Web, Mobile & Software Dev",
      "IT & Networking",
      "Data Science & Analytics",
      "Engineering & Architecture",
      "Design & Creative",
      "Writing",
      "Translation",
      "React",
      "javaScript",
      "Node.js",
      "Angular",
      "React Native",
      "Android",
      "iOS",
      "Python",
      "Django",
      "Flask",
    ],
    myJobs: {},
  },
  reducers: {
    setPerson: (state, action) => {
      state.info = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setMyJobs: (state, action) => {
      state.myJobs = action.payload;
    },
    deleteJob: (state, action) => {
      const jobIdToDelete = action.payload;
      state.myJobs = state.myJobs.filter((job) => job.id !== jobIdToDelete);
    },
    addJob(state, action) {
      state.myJobs.push(action.payload);
    },
  },
});

export const { setPerson, setAuthenticated, setMyJobs, deleteJob, addJob } =
  personSlice.actions;

export default personSlice.reducer;
