import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        displayNotification(state, action) {
            return `"${action.payload}" was voted up!`
        },
        removeNotification(state, action) {
            return action.payload
        }
    }
})

export const { displayNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer