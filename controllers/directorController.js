const Director = require("../models/Director.js");
const Movie = require("../models/Movie.js");

/// @POST /add-director

const addDirector = async (req, res) => {
  try {
    const { firstName, lastName, bday } = req.body;
    const existingDirector = await Director.findOne({
      firstName: firstName,
      lastName: lastName,
      bday: bday,
    });

    if (existingDirector) {
      return res
        .status(400)
        .json("Director with the same details already exists");
    }

    const director = new Director({
      firstName: firstName,
      lastName: lastName,
      bday: bday,
    });

    const savedDirector = await director.save();
    res.status(200).json("Director added successfully: " + savedDirector);
  } catch (error) {
    res.status(500).json("An error occurred: " + error.message);
  }
};

/// @GET /get-directors
const getDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    if (!directors) {
      return res.status(404).json("No data found");
    }
    res.status(200).json(directors);
  } catch (error) {
    res.status(500).json("An error occurred: " + error.message);
  }
};

///@GET /get-director/:id
const getDirector = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) {
      return res
        .status(404)
        .json("Director not found by this id " + req.params.id);
    }
    res.status(200).json(director);
  } catch (error) {
    res.status(500).json("An error occurred");
  }
};

/// @PUT /update-director/:id
const updateDirector = async (req, res) => {
  try {
    const { firstName, lastName, bday } = req.body;
    const director = await Director.findById(req.params.id);

    if (!director) {
      return res
        .status(404)
        .json("Director Not Found By This ID " + req.params.id);
    }

    if (!firstName || !lastName || !bday) {
      return res.status(404).send("Same Fields Are Not Filled");
    }

    director.firstName = firstName;
    director.lastName = lastName;
    director.bday = bday;

    await director.save();
    res.status(200).json("Director updated successfully");
  } catch (error) {
    res.status(500).json("An error occurred");
  }
};

/// @DELETE /delete-director/:id
const deleteDirector = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    const doDirectorHasMovies = await Movie.find({
      movieDirector: req.params.id,
    });
    if (doDirectorHasMovies.length > 0) {
      return res.status(404).json("First Delete Movies of Director.");
    }
    if (!director) {
      return res.status(404).json("Error Data By ID was not found");
    }
    await director.deleteOne();
    res.status(200).json("Director Was Deleted");
  } catch (error) {
    res.status(500).json("An error occurred");
  }
};

module.exports = {
  addDirector,
  getDirectors,
  getDirector,
  updateDirector,
  deleteDirector,
};
