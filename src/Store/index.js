import { configureStore } from "@reduxjs/toolkit";
import clientTableSlice from "./ClientTable-redux";

const store = configureStore({
    reducer : {clientTable : clientTableSlice.reducer}
});

export default store;