require("dotenv").config();
const connection = require("./dbConfig/connectionController.js");

const {
  addDirector,
  getDirectors,
  getDirector,
  updateDirector,
  deleteDirector,
} = require("./controllers/directorController.js");

const {
  addMovie,
  selectAllMovie,
  selectMovie,
  updateMovie,
  deleteMovie,
} = require("./controllers/movieController.js");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connection();

app.post("/add-director", addDirector); /// works
app.get("/get-directors", getDirectors); /// works
app.get("/get-director/:id", getDirector); /// works
app.put("/update-director/:id", updateDirector); /// works
app.delete("/delete-director/:id", deleteDirector); /// works

app.post("/add-movie", addMovie); /// works
app.get("/show-movies", selectAllMovie); /// works
app.get("/show-movie/:id", selectMovie); /// works
app.put("/update-movie/:id", updateMovie); /// works
app.delete("/delete-movie/:id", deleteMovie); /// works

app.listen(process.env.PORT, () => {
  console.log("Server up and running on port ===> " + process.env.PORT);
});
