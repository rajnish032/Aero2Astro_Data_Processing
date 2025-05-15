import { Schema, model } from "mongoose";

const skillsSchema = new Schema({


    equipmentTypesCanHandle: [
        {
            type: String,
            required: true
        }
    ],
    controlStations:[
        {
            type: String,
            required: true
        }
    ],
    hardwareSkills: [
        {
            type: String,
        }
    ],
    softwareSkills: [
        {
            type: String,
        }
    ],
});


export default skillsSchema;