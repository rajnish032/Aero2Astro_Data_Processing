import { Schema, model } from "mongoose";

const rptoSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    contactPerson: {
      type: String,
      trim: true,
    },
    contactPersonDesignation: {
      type: String,
      enum: ["Manager", "Placement Officer", "RPTO Instructor", "Other"],
      required: true,
    },
    areaPin: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    status:{
      type:String,
      require:true,
      default:"pending",
      enum:["pending","approved"]
    },
    registration_no:{
      type:String,
      require:true,
      trim:true
    }
  },
  { timestamps: true }
);

const Rpto = model("Rpto", rptoSchema);
export default Rpto;
