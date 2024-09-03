const express = require("express");
const Attendance = require("../models/Attendance");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split("T")[0];

  try {
    const existingAttendance = await Attendance.findOne({
      userId,
      date: today,
    });
    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today." });
    }

    const attendance = new Attendance({ userId, date: today });
    await attendance.save();
    res.status(200).json({ message: "Attendance marked successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const attendances = await Attendance.find({ userId });
    res.json(attendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
