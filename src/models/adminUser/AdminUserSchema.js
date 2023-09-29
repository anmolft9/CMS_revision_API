import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
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
    maxLength: [20, "First name cannot be longer than 20 characters"],
  },
  email: {
    type: String,
    unique: true,
    index: 1,
    required: true,
    maxLength: [20, "First name cannot be longer than 20 characters"],
  },
  password: {
    type: String,
    required: true,
    maxLength: [20, "First name cannot be longer than 20 characters"],
  },
  phone: {
    type: String,
    required: true,
    maxLength: [20, "First name cannot be longer than 20 characters"],
  },
  address: {
    type: String,
    required: true,
    maxLength: [20, "First name cannot be longer than 20 characters"],
  },
  DOB: {
    type: String,
    required: true,
    maxLength: [20, "First name cannot be longer than 20 characters"],
  },
});
