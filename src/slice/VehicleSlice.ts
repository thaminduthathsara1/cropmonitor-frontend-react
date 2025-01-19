import {Vehicle} from "../model/Vehicle.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import vehicleData from "../dummyData/VehicleDummyData.ts";

const initialState: Vehicle[] = vehicleData;
const vehicleSlice = createSlice({
    name : 'vehicle',
    initialState,
    reducers: {
        addVehicle: (state, action: PayloadAction<Vehicle>) => {
            state.push(action.payload);
        },
        updateVehicle: (state, action: PayloadAction<Vehicle>) => {
            const index = state.findIndex(vehicle => vehicle.licensePlate === action.payload.licensePlate);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        },
        removeVehicle: (state, action: PayloadAction<string>) => {
            return state.filter(vehicle => vehicle.code !== action.payload);
        }
    }
});

export const {addVehicle, removeVehicle, updateVehicle} = vehicleSlice.actions;
export default vehicleSlice.reducer;