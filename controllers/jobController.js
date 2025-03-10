const Job = require("../models/Job");

// Create a job listing
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: "Error creating job listing" });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

// Update a job listing
exports.updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job || job.postedBy.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedJob);
};

// Delete a job listing
exports.deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job || job.postedBy.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted successfully" });
};
