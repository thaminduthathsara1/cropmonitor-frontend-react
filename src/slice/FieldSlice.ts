import {Field} from "../model/Field.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import fieldData from "../dummyData/FieldDummyData.ts";

const initialState: Field [] = fieldData;

const fieldSlice= createSlice({
    name: 'field',
    initialState,
    reducers: {
        addField: (state, action: PayloadAction<Field>) => {
            state.push(action.payload);
        },
        removeField: (state, action: PayloadAction<string>) => {
            return state.filter(field => field.fieldCode !== action.payload);
        },
        updateField: (state, action: PayloadAction<Field>) => {
            const index = state.findIndex(field => field.fieldCode === action.payload.fieldCode);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        }
    }
});

export const {addField, updateField, removeField} = fieldSlice.actions;
export default fieldSlice.reducer;