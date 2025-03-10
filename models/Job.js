const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  logoUrl: { type: String },
  position: { type: String, required: true },
  salary: { type: Number },
  jobType: { type: String, enum: ["Internship", "Full-Time", "Part-Time", "Contractual"], required: true },
  location: { type: String, required: true },
  remote: { type: Boolean, default: false },
  description: { type: String, required: true },
  skills: { type: [String], required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
