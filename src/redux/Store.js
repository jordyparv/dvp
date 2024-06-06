import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slice/loginSlice";
import addUserReducer from "./Slice/addUserSlice";
import apiSettingsReducers from "./Slice/settingsApiSlice";
import subjectReducers from "./Slice/subjectSlice";

const myStore = configureStore({
    reducer: {
        login: loginReducer,
        addUser: addUserReducer,
        apiSettings: apiSettingsReducers,
        subjects: subjectReducers,
    }
})

export default myStore;
