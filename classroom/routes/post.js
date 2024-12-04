const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("root is working");
});

router.get("/:id", (req, res) => {
  res.send("root is working");
});

router.post("/", (req, res) => {
  res.send("root is working");
});

router.delete("/:id", (req, res) => {
  res.send("root is working");
});

module.exports = router;
