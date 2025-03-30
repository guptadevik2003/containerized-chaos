require("dotenv").config();
const express = require("express");
const { meter } = require("./telemetry");
const logger = require("./logger");
const { queryDatabase } = require("./database");

const app = express();
const PORT = process.env.PORT || 8080;

// Custom metric: API request count
const requestCount = meter.createCounter("api_requests_total", {
  description: "Total number of API requests",
});

app.use((req, res, next) => {
  requestCount.add(1, { route: req.path });
  next();
});

// Sample API endpoint
app.get("/api/data", async (req, res) => {
  try {
    logger.info("Fetching data...");
    const data = await queryDatabase();
    res.json({ success: true, data });
  } catch (error) {
    logger.error("Error fetching data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
