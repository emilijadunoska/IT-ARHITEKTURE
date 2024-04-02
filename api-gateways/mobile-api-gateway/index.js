const express = require("express");
const app = express();
const grpc = require("@grpc/grpc-js");
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(express.json());

const {
  MembershipServiceClient,
} = require("./generated/proto/membership_grpc_pb");
const {
  GetMembershipRequest,
  DeleteMembershipRequest,
} = require("./generated/proto/membership_pb");

const client = new MembershipServiceClient(
  "membership-service:9000",
  grpc.credentials.createInsecure()
);

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
  onProxyReq: (proxyReq, req, res) => {
    if (req.method === "GET" || req.method === "DELETE") {
      proxyReq.setHeader("Content-Type", "application/json");
    } else {
      res
        .status(405)
        .json({ error: "Sorry, this action is not possible on mobile. " });
      res.end();
    }
  },
});

const groupClassesProxy = createProxyMiddleware({
  target: "http://group-classes-service:8080",
  changeOrigin: true,
  pathRewrite: {
    "^/groupclass": "/groupclass",
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.method === "GET" || req.method === "DELETE") {
      proxyReq.setHeader("Content-Type", "application/json");
    } else {
      res
        .status(405)
        .json({ error: "Sorry, this action is not possible on mobile. " });
      res.end();
    }
  },
});

app.use("/api/user", usersProxy);
app.use("/groupclass", groupClassesProxy);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`BFF Mobile listening at http://localhost:${PORT}`);
});
