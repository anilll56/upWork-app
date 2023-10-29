import { createSlice } from "@reduxjs/toolkit";

export const personSlice = createSlice({
  name: "person",
  initialState: {
    person: {
      authenticated: false,
      personInfo: {},
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
