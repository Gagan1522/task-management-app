const express = require("express");
const router = express.Router();

const { analyzeThreat } = require("../ai/analyzer");
const Scan = require("../ai/models/Scan");

// Scan API
router.post("/scan", async (req, res) => {
  try {
    const { url } = req.body;

    const threatLevel = analyzeThreat(url);

    const newScan = await Scan.create({
      url,
      threatLevel,
      timestamp: new Date().toISOString(),
    });

    res.json({
      status: "Scanned",
      threatLevel,
      timestamp: newScan.timestamp,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// History API
router.get("/history", async (req, res) => {
  try {
    const scans = await Scan.find().sort({ _id: -1 }).limit(20);
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;