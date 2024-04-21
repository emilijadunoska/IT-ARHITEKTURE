const express = require("express");
const app = express();
const Log = require("./models/log");
const connectDB = require("./config/db");

connectDB();

// Fetch all logs from the database
app.get("/logs", async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get most frequent action
app.get("/mostFrequentAction", async (req, res) => {
  try {
    const mostFrequentAction = await Log.aggregate([
      { $group: { _id: "$action", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    res.json(mostFrequentAction);
  } catch (error) {
    console.error("Error fetching most frequent action:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 2001;
app.listen(PORT, () => {
  console.log(`Log Service listening at http://localhost:${PORT}`);
});
