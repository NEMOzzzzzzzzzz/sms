const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flat: { type: String, required: true },
  contact: { type: String, required: true },
});

module.exports = mongoose.model("Resident", residentSchema);
