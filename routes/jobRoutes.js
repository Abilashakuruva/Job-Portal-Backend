const express = require("express");
/*const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");*/

const router = express.Router();

/*router.post("/", authMiddleware, createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);*/

const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");
const { createJob } = require("../controllers/jobController");

router.post("/create", authenticateUser, authorizeAdmin, createJob);


router.post("/jobs", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const {
      companyname,
      url,
      position,
      salary,
      location,
      description,
      aboutcompany,
      information,
      jobtype,
      remoteOffice,
      skills
    } = req.body;

    // Validate required fields
    if (!companyname || !position || !salary || !location || !jobtype) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Create new job
    const newJob = await Job.create({
      companyname,
      url,
      position,
      salary,
      location,
      description,
      aboutcompany,
      information,
      jobtype,
      remoteOffice,
      skills: JSON.stringify(skills), // Store as JSON string if needed
    });

    res.status(201).json({ message: "Job added successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;


