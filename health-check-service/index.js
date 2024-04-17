const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");

const app = express();
const PORT = 2000;

app.use(cors());

function healthCheckLogger(req, res, next) {
  const logMessage = `Health Check - Timestamp: ${new Date().toISOString()}, URL: ${
    req.originalUrl
  }`;
  fs.appendFile("health-check.log", logMessage + "\n", (err) => {
    if (err) {
      console.error("Error writing to health-check.log:", err);
    }
  });
  next();
}

async function checkHealth(url, serviceName) {
  try {
    const response = await axios.get(url);
    return {
      service: serviceName,
      status: response.data.status,
      checks: response.data.checks,
    };
  } catch (error) {
    console.error(`Error checking health for ${serviceName}: ${error.message}`);
    return { service: serviceName, status: "Error", message: error.message };
  }
}

app.get("/health-check", healthCheckLogger, async (req, res) => {
  const services = [
    {
      url: "http://group-classes-service:8080/q/health",
      name: "Group Classes Service",
    },
    { url: "http://user-service:8080/actuator/health", name: "User Service" },
  ];

  const healthChecks = await Promise.all(
    services.map((service) => checkHealth(service.url, service.name))
  );

  console.log("Health Checks:");
  healthChecks.forEach((check) => {
    console.log(`${check.service}: ${check.status}`);
  });

  res.json(healthChecks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
