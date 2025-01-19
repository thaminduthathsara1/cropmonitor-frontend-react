import staffData from "./StaffDummyData.ts";
import {Vehicle} from "../model/Vehicle.ts";
const vehicleData: Vehicle[] = [
    new Vehicle(
        "ABC-1234",
        "Sedan",
        "Petrol",
        "available",
        staffData[0],
        "No remarks"
    ),
    new Vehicle(
        "XYZ-5678",
        "SUV",
        "Diesel",
        "out of service",
        staffData[1],
        "Scheduled for servicing"
    ),
    new Vehicle(
        "LMN-9012",
        "Hatchback",
        "Petrol",
        "available",
        staffData[2],
        "Used for daily commutes"
    ),
    new Vehicle(
        "QRS-3456",
        "Van",
        "Diesel",
        "out of service",
        staffData[3],
        "Requires repairs"
    ),
    new Vehicle(
        "TUV-7890",
        "Truck",
        "Electric",
        "available",
        staffData[4],
        "Used for logistics"
    )
];

export default vehicleData;
