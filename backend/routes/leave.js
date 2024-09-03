const express = require("express");
const LeaveRequest = require("../models/LeaveRequest");
const authMiddleware = require("../middleware/authMiddleware");
const leavemiddleware = require("../middleware/leavemiddleware");
const router = express.Router();

// Mark Leave
router.post("/", leavemiddleware, async (req, res) => {
  const { reason } = req.body;
  const userId = req.user.id;

  try {
    const leaveRequest = new LeaveRequest({ userId, reason });
    await leaveRequest.save();
    res.status(201).json({ message: "Leave request submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", leavemiddleware, async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate("userId");
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
