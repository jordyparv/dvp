import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slice/loginSlice";
import addUserReducer from "./Slice/addUserSlice";
import apiSettingsReducers from "./Slice/settingsApiSlice";

const myStore = configureStore({
    reducer: {
        login: loginReducer,
        addUser: addUserReducer,
        apiSettings: apiSettingsReducers
    }
})

export default myStore;
