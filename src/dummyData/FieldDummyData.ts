import { Field } from "../model/Field.ts";
import staffData from "./StaffDummyData.ts";

const fieldData: Field[] = [
    new Field(
        "Field-Puttalam",
        { latitude: 8.0150, longitude: 79.9300 },
        30,
        [staffData[0], staffData[1]],
    ),
    new Field(
        "Field-Anuradhapura",
        { latitude: 8.3110, longitude: 80.4148 },
        40,
        [staffData[1], staffData[2]],
    ),
    new Field(
        "Field-Polonnaruwa",
        { latitude: 7.9405, longitude: 81.0253 },
        35,
        [staffData[2], staffData[3]],
    ),
    new Field(
        "Field-Kurunegala",
        { latitude: 7.4794, longitude: 80.3581 },
        50,
        [staffData[1], staffData[4]],
    ),
    new Field(
        "Field-Ratnapura",
        { latitude: 6.6799, longitude: 80.3843 },
        60,
        [staffData[0], staffData[2]],
    )
];

export default fieldData;
