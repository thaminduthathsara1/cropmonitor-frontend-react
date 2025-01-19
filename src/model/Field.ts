import { v4 as uuidv4 } from 'uuid';
import { Staff } from "./Staff.ts";

export class Field {
    fieldCode: string = `FE-${uuidv4()}`;
    fieldName: string;
    fieldLocation: { latitude: number; longitude: number };
    fieldSize: number;
    fieldImage1?: string;
    fieldImage2?: string;
    staffs: Staff[];

    constructor(
        fieldName: string,
        fieldLocation: { latitude: number; longitude: number },
        fieldSize: number,
        staffs: Staff[],
        fieldImage1?: string,
        fieldImage2?: string
    ) {
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldSize = fieldSize;
        this.staffs = staffs;
        this.fieldImage1 = fieldImage1;
        this.fieldImage2 = fieldImage2;
    }
}