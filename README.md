# 🎥 Movie Manager

Movie Manager is a web-based CRUD (Create, Read, Update, Delete) application for managing movies and directors. It allows users to add, edit, delete, and view movies and directors with a user-friendly interface.

---

## 🚀 Features

### 🎬 Movies

- Add new movies with details such as title, description, release year, director, and genres.
- View a list of all movies with their details.
- Edit movie details, including title, description, release year, director, and genres.
- Delete movies with confirmation prompts.

### 🎭 Directors

- Add new directors with details such as first name, last name, and birthday.
- View a list of all directors.
- Edit director details.
- Delete directors with confirmation prompts.

### 🛠️ Additional Features

- Dynamic forms for adding and editing movies and directors.
- Popup notifications for success and error messages.
- Responsive design for a seamless user experience.
- Custom animations for UI elements.

---

## 📂 Project Structure

```
crud-mod/
├── public/
│   ├── css/
│   │   └── style.css       # Styles for the application
│   ├── js/
│   │   └── script.js       # Main JavaScript logic
│   └── images/
│       └── bg.jpg          # Background image
├── app.js                 # Backend server logic
├── README.md               # Project documentation
└── package.json            # Node.js dependencies
```

---

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Custom CSS with animations
- **Icons**: Unicode emojis for buttons and labels

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-manager.git
   cd movie-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node app.js
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## 📖 Usage

### Adding a Director

1. Click the **Manage Directors** button.
2. Fill in the form with the director's first name, last name, and birthday.
3. Click **Add Director** to save the director.

### Adding a Movie

1. Click the **Add Movie** button.
2. Fill in the form with the movie's title, description, release year, director, and genres.
3. Click **Add Movie** to save the movie.

### Editing or Deleting

- Use the **Edit** or **Delete** buttons in the respective lists to modify or remove entries.

---

## 🎨 Styling

The application uses a modern design with:

- Radial gradients for backgrounds.
- Hover effects for buttons.
- Custom animations for popups and transitions.

---

## 📋 API Endpoints

### Directors

- `GET /get-directors` - Fetch all directors.
- `POST /add-director` - Add a new director.
- `PUT /update-director/:id` - Update a director's details.
- `DELETE /delete-director/:id` - Delete a director.

### Movies

- `GET /show-movies` - Fetch all movies.
- `POST /add-movie` - Add a new movie.
- `PUT /update-movie/:id` - Update a movie's details.
- `DELETE /delete-movie/:id` - Delete a movie.

---

## 🛡️ Error Handling

- Displays error messages in a popup for failed operations.
- Validates form inputs before submission.
- Handles server-side errors gracefully.
