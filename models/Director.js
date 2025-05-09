const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bday: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Director", directorSchema);
