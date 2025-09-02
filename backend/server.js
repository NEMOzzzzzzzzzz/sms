const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/residents", require("./routes/residents"));

// Connect DB & start server
mongoose.connect("mongodb://127.0.0.1:27017/sms")
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(err => console.log(err));
