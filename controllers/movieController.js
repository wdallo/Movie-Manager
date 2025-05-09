const Movie = require("../models/Movie.js");
const Director = require("../models/Director.js");
const mongoose = require("mongoose");

///@POST /add-movie
const addMovie = async (req, res) => {
  try {
    const { title, description, year, genre, movieDirector } = req.body;

    if (!title || !description || !year || !genre || !movieDirector) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate movieDirector as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(movieDirector)) {
      return res.status(400).json({ message: "Invalid director ID" });
    }

    const directorExists = await Director.findById(movieDirector);
    if (!directorExists) {
      return res.status(404).json({ message: "Director not found" });
    }

    const newMovie = new Movie({
      title,
      description,
      year,
      genre,
      movieDirector,
    });

    const savedMovie = await newMovie.save();
    return res.status(200).json({ savedMovie, message: "Movie Was Added!" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while adding the movie",
      details: error.message,
    });
  }
};

///@GET /show-movies
const selectAllMovie = async (_, res) => {
  try {
    const movies = await Movie.find().populate(
      "movieDirector",
      "firstName lastName bday _id" // Select specific fields from the Director model
    );

    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while fetching movies",
      details: error.message,
    });
  }
};

///@GET /show-movie/:id

const selectMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate(
      "movieDirector",
      "firstName lastName bday _id"
    );
    if (!movie || movie.length === 0) {
      return res.status(404).json({ message: "No Movie Was Found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(404).json({
      error: "An error occurred while fetching a movie",
      details: error.message,
    });
  }
};

///@PUT /update-movie/:id
const updateMovie = async (req, res) => {
  try {
    const { movieDirector, title, description, year, genre } = req.body;
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
      movieDirector,
      title,
      description,
      year,
      genre,
    });
    if (!movie) {
      return res.status(404).json("No Movie Find By That ID");
    }

    res.status(200).json({ movie, message: "Movie Was Updated" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occurred", details: error.message });
  }
};

///@DELETE /delete-movie/:id
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(400).json({ message: "Error ID Not Found" });
    }
    res.status(200).json({ movie, message: "Movie Was Deleted" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error Movie Not Deleted", details: error.message });
  }
};

module.exports = {
  addMovie,
  selectAllMovie,
  selectMovie,
  updateMovie,
  deleteMovie,
};
