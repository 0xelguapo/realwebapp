import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./clients-slice";
import propertiesReducer from './properties-slice'
import propertyGroupsReducer from './propertyGroups-slice'
import groupsReducer from './groups-slice'

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    groups: groupsReducer,
    properties: propertiesReducer,
    propertyGroups: propertyGroupsReducer
  },
});

export default store;
