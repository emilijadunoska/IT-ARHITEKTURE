const express = require("express");
const app = express();
const grpc = require("@grpc/grpc-js");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const connectDB = require("./config/db");
const Log = require("./models/log");

app.use(express.json());
app.use(cors());

connectDB();

const {
  MembershipServiceClient,
} = require("./generated/proto/membership_grpc_pb");
const {
  CreateMembershipRequest,
  GetMembershipRequest,
  UpdateMembershipRequest,
  DeleteMembershipRequest,
  GetMembershipByUserIdRequest,
} = require("./generated/proto/membership_pb");

const client = new MembershipServiceClient(
  "membership-service:9000",
  grpc.credentials.createInsecure()
);

// Middleware to log API requests
app.use(async (req, res, next) => {
  const excludedEndpoints = ["/"];

  if (excludedEndpoints.includes(req.path)) {
    return next();
  }

  const logEntry = {
    action: req.path,
    timestamp: new Date(),
    method: req.method,
    url: req.originalUrl,
  };

  try {
    const log = new Log(logEntry);
    await log.save();
    next();
  } catch (error) {
    console.error("Error logging request:", error);
    next(error);
  }
});

app.post("/create", (req, res) => {
  const { userid, type, price, startDate, endDate } = req.body;

  const request = new CreateMembershipRequest();

  request.setUserid(userid);
  request.setType(type);
  request.setPrice(price);
  request.setStartdate(startDate);
  request.setEnddate(endDate);

  client.createMembership(request, (error, response) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Response:", response);
      res.json(response);
    }
  });
});

app.get("/getMembership", (req, res) => {
  const { id } = req.query;

  const requestData = new GetMembershipRequest();
  requestData.setId(id);

  client.getMembership(requestData, (error, response) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Received response:", response);
      res.json(response);
    }
  });
});

app.get("/getMembershipByUserId", (req, res) => {
  const { userId } = req.query;

  const requestData = new GetMembershipByUserIdRequest();
  requestData.setUserid(userId);

  client.getMembershipByUserId(requestData, (error, response) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Received response:", response);
      res.json(response);
    }
  });
});

app.put("/updateMembership", (req, res) => {
  const { id, userid, type, price, startDate, endDate } = req.body;

  const request = new UpdateMembershipRequest();
  request.setId(id);
  if (userid) request.setUserId(userid);
  if (type) request.setType(type);
  if (price) request.setPrice(price);
  if (startDate) request.setStartdate(startDate);
  if (endDate) request.setEnddate(endDate);

  client.updateMembership(request, (error, response) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Response:", response);
      res.json(response);
    }
  });
});

app.delete("/delete", (req, res) => {
  const { id } = req.query;

  const request = new DeleteMembershipRequest();
  request.setId(id);

  client.deleteMembership(request, (error, response) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Membership deleted successfully");
      res.status(204).end();
    }
  });
});

const usersProxy = createProxyMiddleware({
  target: "http://user-service:8080",
  changeOrigin: true,
  pathRewrite: {
    "^/api/user": "/api/user",
  },
});

const groupClassesProxy = createProxyMiddleware({
  target: "http://group-classes-service:8080",
  changeOrigin: true,
  pathRewrite: {
    "^/groupclass": "/groupclass",
  },
});

app.use("/api/user", usersProxy);
app.use("/groupclass", groupClassesProxy);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`BFF Web listening at http://localhost:${PORT}`);
});
