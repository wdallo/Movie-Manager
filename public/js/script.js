const fetchUrl = "http://localhost:3000/";
const getContainer = document.getElementById("container");
const getButtonContainer = document.getElementById("buttonContainer");
const getLogo = document.getElementById("logo");
const showMoviesButton = document.createElement("button");
showMoviesButton.textContent = "Movie List";

const addDirectorButton = document.createElement("button");
addDirectorButton.textContent = "Manage Directors";

const addMovieButton = document.createElement("button");
addMovieButton.textContent = "Add Movie";
const logo = document.createElement("h1");
logo.textContent = "🍿Movie Manager";
logo.id = "logo";

getLogo.appendChild(logo);
getButtonContainer.append(showMoviesButton, addDirectorButton, addMovieButton);

function title(title) {
  const existingTitle = document.getElementById("title");
  if (existingTitle) {
    existingTitle.remove();
  }

  const titleName = document.createElement("h2");
  titleName.id = "title";
  titleName.textContent = title;

  getContainer.appendChild(titleName);
}

/// POP UP -->> ERROR and Success
function showPopup(message, isSuccess = true) {
  const popup = document.createElement("div");
  popup.className = `${isSuccess ? "success" : "error"}-message`;
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}
///////////

////////////////
/// press button to create Director Form;
addDirectorButton.addEventListener("click", () => {
  showDirectorTab();
});
function showDirectorTab() {
  getContainer.innerHTML = "";

  title("Add Director");

  const form = document.createElement("form");
  form.id = "directorForm";

  const inputFirstName = document.createElement("input");
  inputFirstName.type = "text";
  inputFirstName.name = "firstName";
  inputFirstName.placeholder = "Enter Firstname";

  const inputLastName = document.createElement("input");
  inputLastName.type = "text";
  inputLastName.name = "lastName";
  inputLastName.placeholder = "Enter Lastname";

  const inputBday = document.createElement("input");
  inputBday.type = "date";
  inputBday.name = "bday";

  const inputButton = document.createElement("button");
  inputButton.type = "submit";
  inputButton.textContent = "Add Director";
  getContainer.appendChild(form);

  if (inputButton) {
    inputButton.addEventListener("click", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const addDirectorData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        bday: formData.get("bday"),
      };

      fetch(fetchUrl + "add-director", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addDirectorData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Somethig went wrong...");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          showPopup("Director Was Added", true);
          showDirectorTab();
        })
        .catch((error) => {
          console.log(error);
          showPopup("Error Adding Director", false);
        });
    });
  }

  form.append(inputFirstName, inputLastName, inputBday, inputButton);

  const table = document.createElement("table");
  const tr = document.createElement("tr");
  table.id = "directorList";

  const checkTable = document.querySelector("#directorList");
  if (!checkTable) {
    getContainer.appendChild(table);
    table.appendChild(tr);
    const heading = ["Firstname", "Lastname", "Birthday", "Data Controller"];
    heading.forEach((element) => {
      const th = document.createElement("th");
      th.style.textAlign = "center";
      th.textContent = element;
      tr.appendChild(th);
    });
  }

  const row = document.createElement("tr");

  const cellFirstName = document.createElement("td");
  cellFirstName.style.textAlign = "center";
  const cellLastName = document.createElement("td");
  cellLastName.style.textAlign = "center";
  // Removed unused cellBday declaration
  const dataControl = document.createElement("td");
  dataControl.id = "dataControl";
  dataControl.style.textAlign = "center";

  fetch(fetchUrl + "get-directors", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something is wrong.");
      }
      return response.json(); // Return the parsed JSON response
    })
    .then((data) => {
      data.forEach((element) => {
        const row = document.createElement("tr");

        const cellFirstName = document.createElement("td");
        cellFirstName.style.textAlign = "center";
        cellFirstName.textContent = element.firstName;

        const cellLastName = document.createElement("td");
        cellLastName.style.textAlign = "center";
        cellLastName.textContent = element.lastName;

        const cellBday = document.createElement("td");
        cellBday.textContent = element.bday.split("T")[0];

        const dataControl = document.createElement("td");
        dataControl.id = "dataControl";
        dataControl.style.textAlign = "center";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️ Delete";
        deleteBtn.id = "deleteBtn";

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️ Edit";
        editBtn.id = "editBtn";

        dataControl.append(deleteBtn, editBtn);

        row.append(cellFirstName, cellLastName, cellBday, dataControl);
        table.appendChild(row);

        editBtn.addEventListener("click", (event) => {
          event.preventDefault();

          // Create a form for editing the director's details
          const editForm = document.createElement("form");
          editForm.id = "editDirectorForm";

          const inputFirstName = document.createElement("input");
          inputFirstName.type = "text";
          inputFirstName.name = "firstName";
          inputFirstName.value = element.firstName;
          inputFirstName.placeholder = "Edit Firstname";

          const inputLastName = document.createElement("input");
          inputLastName.type = "text";
          inputLastName.name = "lastName";
          inputLastName.value = element.lastName;
          inputLastName.placeholder = "Edit Lastname";

          const inputBday = document.createElement("input");
          inputBday.type = "date";
          inputBday.name = "bday";
          inputBday.value = element.bday.split("T")[0];

          const saveButton = document.createElement("button");
          saveButton.type = "submit";
          saveButton.textContent = "Save Changes";

          const cancelButton = document.createElement("button");
          cancelButton.type = "button";
          cancelButton.textContent = "Cancel";

          editForm.append(
            inputFirstName,
            inputLastName,
            inputBday,
            saveButton,
            cancelButton
          );

          // Replace the current row with the edit form
          row.innerHTML = "";
          const editCell = document.createElement("td");
          editCell.colSpan = 4; // Span across all columns
          editCell.appendChild(editForm);
          row.appendChild(editCell);

          // Handle form submission
          editForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const updatedDirectorData = {
              firstName: inputFirstName.value,
              lastName: inputLastName.value,
              bday: inputBday.value,
            };
            // Check if data has changed
            const isDataChanged =
              updatedDirectorData.firstName !== element.firstName ||
              updatedDirectorData.lastName !== element.lastName ||
              updatedDirectorData.bday !== element.bday.split("T")[0];

            if (!isDataChanged) {
              showPopup("No changes detected. Update aborted.", false);
              return;
            }
            // Send the updated data to the server
            fetch(`${fetchUrl}update-director/${element._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedDirectorData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error updating director");
                }
                return response.json();
              })
              .then((data) => {
                console.log("Director updated:", data);
                showPopup("Director updated successfully", true);
                showDirectorTab(); // Refresh the director list
              })
              .catch((error) => {
                console.log("Error updating director:", error);
                showPopup("Error updating director", false);
              });
          });

          // Handle cancel button
          cancelButton.addEventListener("click", () => {
            showDirectorTab(); // Refresh the director list to cancel editing
          });
        });

        deleteBtn.addEventListener("click", (event) => {
          event.preventDefault();
          const checkIfAlertBoxExist = document.getElementById("alertBox");

          if (!checkIfAlertBoxExist) {
            const alertBox = document.createElement("div");
            alertBox.id = "alertBox";

            const textMessage = document.createElement("h3");
            textMessage.textContent =
              "Do You Really want to delete this Director?";
            const buttonYes = document.createElement("button");
            buttonYes.id = "btnYes";
            buttonYes.textContent = "Yes";
            const buttonNo = document.createElement("button");
            buttonNo.id = "btnNo";
            buttonNo.textContent = "No";
            document.body.appendChild(alertBox);

            alertBox.append(textMessage, buttonYes, buttonNo);

            buttonNo.addEventListener("click", () => {
              alertBox.remove();
            });

            buttonYes.addEventListener("click", () => {
              fetch(fetchUrl + "delete-director/" + element._id, {
                method: "DELETE",
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Something wrong");
                  }
                  return response.json();
                })
                .then((data) => {
                  showDirectorTab();
                  showPopup("Director Was Deleted", true);
                })
                .catch((error) => {
                  console.log(error);
                  showPopup("Director was Not Deleted / ERROR", false);
                });

              alertBox.remove();
            });
          }
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  table.appendChild(row);
  getContainer.appendChild(table);
}

//// add movie button event

addMovieButton.addEventListener("click", () => {
  getContainer.innerHTML = "";

  title("Add Movie");

  const form = document.createElement("form");
  form.id = "movieForm";

  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.name = "title";
  inputTitle.placeholder = "Enter Movie Title";

  const inputDescription = document.createElement("textarea");
  inputDescription.name = "description";
  inputDescription.placeholder = "Enter Movie Description...";

  const inputYear = document.createElement("input");
  inputYear.type = "number";
  inputYear.name = "year";
  inputYear.placeholder = "Enter Year Of Movie";

  const directorSelect = document.createElement("select");
  directorSelect.name = "director";

  const defaultOption = document.createElement("option");
  defaultOption.disabled = true;
  defaultOption.selected = true; // Ensure it is selected by default
  defaultOption.textContent = "Please Select Director";
  directorSelect.appendChild(defaultOption);

  fetch(fetchUrl + "get-directors", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const option = document.createElement("option");
        option.value = element._id;
        option.textContent = `${element.firstName} ${element.lastName}`;
        directorSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching Directors:", error);
    });

  getContainer.appendChild(form);
  form.append(inputTitle, inputYear, directorSelect, inputDescription);

  const genreList = [
    "Action",
    "Horror",
    "War",
    "Drama",
    "Romance",
    "Crime",
    "Comedy",
    "Adventure",
    "Fantasy",
    "Sci-Fi",
    "Thriller",
    "Mystery",
    "Animation",
    "Family",
    "Musical",
    "Western",
    "Biography",
    "History",
    "Sport",
    "Documentary",
    "Film-Noir",
  ];

  const checkboxContainer = document.createElement("div");
  checkboxContainer.className = "checkbox-container";

  form.appendChild(checkboxContainer);

  genreList.forEach((element) => {
    const inputGenre = document.createElement("input");
    inputGenre.type = "checkbox";
    inputGenre.value = element;
    inputGenre.name = element;
    inputGenre.id = element;

    const inputLabel = document.createElement("label");
    inputLabel.htmlFor = element;
    inputLabel.textContent = element;
    checkboxContainer.append(inputGenre, inputLabel);
  });

  const insertButton = document.createElement("button");
  insertButton.type = "submit";
  insertButton.textContent = "Add Movie";
  insertButton.id = "insertMovie";
  form.appendChild(insertButton);

  //// Insert To SQL;
  if (insertButton) {
    insertButton.addEventListener("click", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const movieData = {
        title: formData.get("title"),
        description: formData.get("description"),
        year: formData.get("year"),
        movieDirector: formData.get("director"),
        genre: Array.from(
          form.querySelectorAll("input[type='checkbox']:checked")
        ).map((checkbox) => checkbox.value),
      };

      fetch(fetchUrl + "add-movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          showPopup("Movie Was Added", true);
        })
        .catch((error) => {
          console.error("Error adding movie:", error);
          showPopup("Error adding movie", false);
        });
      form.reset();
    });
  }
});

function showTable() {
  getContainer.innerHTML = "";

  title("Movie List");

  const table = document.createElement("table");
  const tr = document.createElement("tr");

  table.id = "movieList";
  const checkTable = document.querySelector("#movieList");
  if (!checkTable) {
    getContainer.appendChild(table);
    table.appendChild(tr);
    const heading = [
      "Title",
      "Description",
      "Release Year",
      "Genre (-s)",
      "Director",
    ];

    heading.forEach((element) => {
      const th = document.createElement("th"); // Create a new <th> for each heading
      th.textContent = element;
      tr.appendChild(th);
    });
  }

  fetch(fetchUrl + "show-movies", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const row = document.createElement("tr");

        /// row.id = element._id;

        row.addEventListener("click", () => {
          const nextRow = row.nextSibling;
          if (nextRow && nextRow.classList.contains("empty-row")) {
            nextRow.remove();
          } else {
            const emptyRow = document.createElement("tr");
            emptyRow.classList.add("empty-row");
            const emptyCell = document.createElement("td");
            emptyCell.colSpan = 5;

            const editDeleteContainer = document.createElement("div");
            editDeleteContainer.id = "editDelete";
            const editTitle = document.createElement("h4");
            editTitle.className = "editTitle";
            editTitle.textContent = "Movie Editing Form";

            const deleteButton = document.createElement("button");
            deleteButton.id = "deleteButton";
            deleteButton.textContent = "Delete";

            editDeleteContainer.append(editTitle, deleteButton);

            const updateForm = document.createElement("form");
            updateForm.classList.add("update-form");

            const inputTitle = document.createElement("input");
            inputTitle.type = "text";
            inputTitle.name = "title";
            inputTitle.value = element.title;
            inputTitle.placeholder = "Update Title";

            const inputDescription = document.createElement("textarea");
            inputDescription.name = "description";
            inputDescription.value = element.description;
            inputDescription.placeholder = "Update Description";

            const inputYear = document.createElement("input");
            inputYear.type = "number";
            inputYear.name = "year";
            inputYear.value = element.year;
            inputYear.placeholder = "Update Year";

            const updateButton = document.createElement("button");
            updateButton.type = "submit";
            updateButton.textContent = "Update Movie";

            const directorSelect = document.createElement("select");
            directorSelect.name = "director";

            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.textContent = "Please Select Director";
            directorSelect.appendChild(defaultOption);

            fetch(fetchUrl + "get-directors", {
              method: "GET",
            })
              .then((response) => response.json())
              .then((directors) => {
                directors.forEach((director) => {
                  const option = document.createElement("option");
                  option.value = director._id;
                  option.textContent = `${director.firstName} ${director.lastName}`;
                  if (
                    element.movieDirector &&
                    element.movieDirector._id === director._id
                  ) {
                    option.selected = true;
                  }
                  directorSelect.appendChild(option);
                });
              })
              .catch((error) => {
                console.error("Error fetching directors:", error);
              });

            updateForm.append(
              editDeleteContainer,
              inputTitle,
              inputYear,
              directorSelect,
              inputDescription
            );

            const genreList = [
              "Action",
              "Horror",
              "War",
              "Drama",
              "Romance",
              "Crime",
              "Comedy",
              "Adventure",
              "Fantasy",
              "Sci-Fi",
              "Thriller",
              "Mystery",
              "Animation",
              "Family",
              "Musical",
              "Western",
              "Biography",
              "History",
              "Sport",
              "Documentary",
              "Film-Noir",
            ];

            const checkboxContainer = document.createElement("div");
            checkboxContainer.className = "checkbox-container";

            updateForm.appendChild(checkboxContainer);

            genreList.forEach((genre) => {
              const inputGenre = document.createElement("input");
              inputGenre.type = "checkbox";
              inputGenre.value = genre;
              inputGenre.name = genre;
              inputGenre.id = genre;

              if (
                Array.isArray(element.genre) &&
                element.genre.includes(inputGenre.value)
              ) {
                inputGenre.checked = true;
              }

              const inputLabel = document.createElement("label");
              inputLabel.htmlFor = genre;
              inputLabel.textContent = genre;
              checkboxContainer.append(inputGenre, inputLabel);
            });

            updateForm.appendChild(updateButton);
            emptyCell.appendChild(updateForm);
            emptyRow.appendChild(emptyCell);

            row.parentNode.insertBefore(emptyRow, row.nextSibling);

            ///delete
            deleteButton.addEventListener("click", (event) => {
              event.preventDefault();
              const checkIfAlertBoxExist = document.getElementById("alertBox");

              if (!checkIfAlertBoxExist) {
                const alertBox = document.createElement("div");
                alertBox.id = "alertBox";

                const textMessage = document.createElement("h3");
                textMessage.textContent =
                  "Do You Really want to delete this Movie?";
                const buttonYes = document.createElement("button");
                buttonYes.id = "btnYes";
                buttonYes.textContent = "Yes";
                const buttonNo = document.createElement("button");
                buttonNo.id = "btnNo";
                buttonNo.textContent = "No";
                document.body.appendChild(alertBox);

                alertBox.append(textMessage, buttonYes, buttonNo);

                buttonNo.addEventListener("click", () => {
                  alertBox.remove();
                });

                buttonYes.addEventListener("click", () => {
                  console.log(element._id);

                  fetch(fetchUrl + "delete-movie/" + element._id, {
                    method: "DELETE",
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Something wrong");
                      }
                      return response.json();
                    })
                    .then((data) => {
                      console.log(data);
                      showPopup("Movie Was Deleted", true);
                    })
                    .catch((error) => {
                      console.log(error);
                      showPopup("Movie was Not Deleted / ERROR", false);
                    });
                  alertBox.remove();
                  showTable();
                });
              }
            });

            updateForm.addEventListener("submit", (event) => {
              event.preventDefault();

              const updatedMovieData = {
                title: inputTitle.value,
                description: inputDescription.value,
                year: inputYear.value,
                movieDirector: updateForm.querySelector(
                  "select[name='director']"
                ).value,
                genre: Array.from(
                  updateForm.querySelectorAll("input[type='checkbox']:checked")
                ).map((checkbox) => checkbox.value),
              };

              // Check if data has changed
              const isDataChanged =
                updatedMovieData.title !== element.title ||
                updatedMovieData.description !== element.description ||
                updatedMovieData.year !== element.year.toString() ||
                updatedMovieData.movieDirector !== element.movieDirector._id ||
                JSON.stringify(updatedMovieData.genre.sort()) !==
                  JSON.stringify((element.genre || []).sort());

              if (!isDataChanged) {
                showPopup("No changes detected. Update aborted.", false);
                return;
              }
              ///////////////
              fetch(`${fetchUrl}update-movie/${element._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedMovieData),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error updating movie");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Movie updated:", data);
                  showPopup("Movie updated successfully", true);
                  showTable(); // Refresh the table
                })
                .catch((error) => {
                  console.error("Error updating movie:", error);
                  showPopup("Error updating movie", false);
                });
            });
          }
        });

        const cellTitle = document.createElement("td");

        cellTitle.textContent = element.title;

        const cellDescription = document.createElement("td");

        cellDescription.textContent = element.description;

        const cellYear = document.createElement("td");
        cellYear.textContent = element.year;

        const cellGenre = document.createElement("td");

        element.genre.forEach((el) => {
          const cellGenreSpan = document.createElement("span");
          cellGenreSpan.textContent = el;
          cellGenreSpan.style.margin = "5px";
          cellGenre.appendChild(cellGenreSpan);
        });

        //director
        const cellDirector = document.createElement("td");
        cellDirector.textContent =
          element.movieDirector.firstName +
          " " +
          element.movieDirector.lastName;

        table.appendChild(row);

        row.append(
          cellTitle,
          cellDescription,
          cellYear,
          cellGenre,
          cellDirector
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

showMoviesButton.addEventListener("click", () => {
  getContainer.innerHTML = "";
  showTable();
});

showTable();
