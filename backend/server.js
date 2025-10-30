const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen("3001", () => {
  console.log("Server Running On Port 3001");
});
