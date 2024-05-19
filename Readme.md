

# Digilog (A Full-Stack Journal App)

This is a full-stack application for managing journal entries. The backend is built with Express.js, and the frontend is rendered using EJS templates.

## Features

- Add new journal entries
- View a list of journal entries
- View individual journal entries
- Update existing journal entries
- Delete journal entries

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript)
- UUID for unique entry IDs
- Body-parser for parsing incoming request bodies

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/pritesh299/Digilog.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Digilog
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the App

1. Start the server:
    ```bash
    node app.js
    ```
2. Open your browser and go to `http://localhost:3000` to view the app.

## Project Structure

```
Digilog/
├── public/                 # Static files (CSS, JS, images)
├── views/                  # EJS templates
│   ├── form.ejs            # Form template for adding/updating entries
│   ├── entry.ejs           # Template for displaying a single entry
│   └── List.ejs            # Template for displaying the list of entries
├── app.js                  # Main application file
├── package.json            # Project metadata and dependencies
└── README.md               # This file
```

## API Endpoints

### Home Page

- **GET /**: Renders the home page with a list of journal entries.

### Journal Entry

- **POST /entry**: Renders a specific journal entry.

### Add New Entry

- **GET /new_entry**: Renders the form for adding a new journal entry.
- **POST /form/submit**: Handles form submission to add a new journal entry.

### Delete Entry

- **POST /delete**: Deletes a specific journal entry.

### Update Entry

- **POST /update_entry**: Renders the form for updating an existing journal entry.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


