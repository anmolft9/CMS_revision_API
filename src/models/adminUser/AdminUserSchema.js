import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: inactive,
    },
    fName: {
      type: String,
      required: true,
      maxLength: [20, "First name cannot be longer than 20 characters"],
    },
    lName: {
      type: String,
      required: true,
      maxLength: [20, "Last name cannot be longer than 20 characters"],
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
      maxLength: [50, "email cannot be longer than 30 characters"],
    },
    password: {
      type: String,
      required: true,
      maxLength: [30, "password cannot be longer than 30 characters"],
    },
    phone: {
      type: String,
      maxLength: [30, "phone number cannot be longer than 30 characters"],
    },
    address: {
      type: String,
      maxLength: [50, "Address cannot be longer than 50 characters"],
      default: "n/a",
    },
    DOB: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
