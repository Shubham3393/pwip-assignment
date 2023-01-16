import { createSlice } from "@reduxjs/toolkit";

const clientTableInitialState = {clientData : [], showData : []}

const clientTableSlice = createSlice({
    name : "client-table",
    initialState : clientTableInitialState,
    reducers : {
        setClientData(state,action){
            state.clientData = action.payload;
        },

        setShowData(state, action){
            state.showData = action.payload;
        }
    }
})

export const clientTableActions = clientTableSlice.actions;
export default clientTableSlice;