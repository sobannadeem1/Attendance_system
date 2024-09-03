// routes/admin.js
const express = require("express");
const adminAuth = require("../middleware/adminauth");
const Attendance = require("../models/Attendance");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Admin = require("../models/adminmodel");
const LeaveRequest = require("../models/LeaveRequest");
const router = new express.Router();
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: admin._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.send({ admin, token });
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/attendance", async (req, res) => {
  try {
    const attendances = await Attendance.find({}).populate("userId", "name");
    res.send(attendances);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.patch("/admin/attendance/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!attendance) {
      return res.status(404).send();
    }
    res.send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/admin/attendance", async (req, res) => {
  const attendance = new Attendance(req.body);
  try {
    await attendance.save();
    res.status(201).send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.delete("/attendance/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).send();
    }
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/admin/report/:userId", async (req, res) => {
  const { from, to } = req.query;
  try {
    const attendance = await Attendance.find({
      userId: req.params.userId,
      date: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    });
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/admin/report", async (req, res) => {
  const { from, to } = req.query;
  try {
    const attendance = await Attendance.find({
      date: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    });
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/report/:userId", async (req, res) => {
  const { from, to } = req.query;

  try {
    const userId = req.params.userId;
    const attendance = await Attendance.find({
      userId: userId,
      date: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    }).populate("userId", "name");

    res.status(200).send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.patch("/leave/:id", async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!leaveRequest) {
      return res.status(404).send();
    }
    res.send(leaveRequest);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/leave", async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({}).populate(
      "userId",
      "name"
    );
    res.status(200).send(leaveRequests);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch leave requests." });
  }
});

module.exports = router;
