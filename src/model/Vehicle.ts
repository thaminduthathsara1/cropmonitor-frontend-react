import {Staff} from "./Staff.ts";
import {v4 as uuidv4} from "uuid";

export class Vehicle{
    code: string = `VH-${uuidv4()}`;
    licensePlate: string;
    category: string;
    fuelType: string;
    status: string;
    allocatedStaffMember: Staff;
    remarks: string;

    constructor(
        licensePlate: string,
        category: string,
        fuelType: string,
        status: string,
        allocatedStaffMember: Staff,
        remarks: string
    ) {
        this.licensePlate = licensePlate;
        this.category = category;
        this.fuelType = fuelType;
        this.status = status;
        this.allocatedStaffMember = allocatedStaffMember;
        this.remarks = remarks;
    }
}