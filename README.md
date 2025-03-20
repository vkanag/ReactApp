# ReactApp
This is a React-based web application that allows users to manage a list of users and tasks. The app provides functionalities for logging in, adding, editing, and deleting users and tasks. It interacts with a backend API(available on my github) to perform CRUD operations, and authentication is handled using JWT tokens.

Key Features:
Login/Logout: Secure login with JWT authentication. User token is saved in sessionStorage.
User Management: Users can be added, edited, and deleted.
Task Management: Each user can be associated with tasks that can be created, updated, and deleted.
API Integration: Communication with backend services for user and task data management.
Responsive Design: The app uses Material UI components for a responsive and user-friendly UI.

Technologies Used:
React: For building the user interface.
Material UI: For responsive UI components and styling.
Axios: For making HTTP requests to the backend.
JWT: For user authentication and authorization.
.NET Web API: A simple .NET Web API backend to handle user and task management. The API is available on GitHub(https://github.com/vkanag/task-manager-api) and can be run locally.

Project Setup
1. Clone the repository
First, clone the repository to your local machine

2. Install dependencies
Install the necessary dependencies using npm 

3. Start the Development Server
Start the development server to run the app locally

This will start the app and open it in your default browser at http://localhost:3000.

API Integration
This app assumes you have a backend API that handles user and task data. You can modify the api.js file to integrate with your backend or use a mock API.

Login: The login functionality requires a valid username and password, which will return a JWT token to be used for subsequent API requests.
User Operations: You can fetch, add, update, or delete users via the respective API endpoints.
Task Operations: Similarly, you can fetch, add, update, or delete tasks.
File Structure
src/: Contains all the React components and pages.
LoginPage.js: The login page where users can authenticate.
UsersPage.js: The page for managing users, including adding, editing, and deleting users.
TasksPage.js: A similar page for managing tasks associated with users.
api.js: Contains all the API calls for interacting with the backend.
