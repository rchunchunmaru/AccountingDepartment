const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const uploadsDir = path.join(__dirname, "Uploads");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen("3001", () => {
  console.log("Server Running On Port 3001");
});
