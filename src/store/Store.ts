import {configureStore} from "@reduxjs/toolkit";
import staffSlice from "../slice/StaffSlice.ts";
import vehicleSlice from "../slice/VehicleSlice.ts";
import fieldSlice from "../slice/FieldSlice.ts";

export const store = configureStore({
    reducer: {
        staff : staffSlice,
        vehicle : vehicleSlice,
        field: fieldSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;