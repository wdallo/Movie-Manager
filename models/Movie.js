const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieDirector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Director", // Ensure this matches the model name in Director.js
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String], // Array of strings for genres
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
