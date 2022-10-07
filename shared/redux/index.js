import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./clients-slice";

const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
});

export default store;
