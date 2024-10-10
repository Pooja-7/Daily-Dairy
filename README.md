# Daily Dairy - Frontend Setup

## Project Description

**Daily Dairy** is a React-based front-end application that connects to a .NET backend for managing a personalized to-do list. Users can register, log in, and manage their to-dos with authentication powered by JWT tokens.

### Features

- **User Registration**: Allows users to sign up with first name, last name, email, and password. After registration, a JWT token is received and stored in `localStorage` for authentication.
- **User Login**: Provides a login option where users enter their email and password, receiving a JWT token upon success.
- **To-Do Management**:
  - View: Users can view a list of their to-dos.
  - Create: Users can create new to-do items by entering a title and selecting if the item is completed.
  - Update: Users can update the title or completion status of existing to-dos.
  - Delete: Users can delete their to-dos.
- **Logout**: Users can log out, clearing the JWT token from local storage.

## Frontend Setup Instructions

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **NPM**: Comes with Node.js, used for managing dependencies.

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/daily-dairy.git
   cd daily-dairy
   ```

2. **Install Dependencies**
   Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

3. **Set Up Environment**

   - Create an `.env` file in the root of your project to store environment variables if needed.
   - Make sure your API URLs are set up correctly in the front-end components and services.

4. **Run the Application**
   Start the React development server:

   ```bash
   npm start
   ```

   This will launch the app at `http://localhost:3000`.

### Key Components

- **Landing Page (`src/components/LandingPage.js`)**: The first page the user sees, offering login and sign-up options.
- **Sign-Up Page (`src/components/SignUp.js`)**: User registration form.
- **Login Page (`src/components/Login.js`)**: User login form.
- **To-Do Page (`src/components/ToDo.js`)**: Displays the list of to-dos. Users can create, update, or delete to-dos.
- **Auth Service (`src/services/authService.js`)**: Handles user authentication (registration and login), including JWT handling and localStorage storage of user tokens.

### Folder Structure

```
/src
  /components
    LandingPage.js
    SignUp.js
    Login.js
    ToDo.js
  /services
    authService.js
    todoService.js
  App.js
  index.js
```

### Functionality

1. **User Registration & Login**

   - Upon successful registration or login, the user is redirected to the to-do page, and a success message (toast) is displayed.

2. **To-Do Management**

   - Fetches all to-dos for the logged-in user based on their `userId` from localStorage.
   - Users can add, update, or delete to-do items.
   - Data is refreshed upon changes to the to-do list.

3. **Logout**
   - A logout button clears the user token and navigates back to the landing page.

### API Endpoints

- **Registration**: `POST /api/Auth/register`
- **Login**: `POST /api/Auth/login`
- **Fetch To-Dos**: `GET /api/ToDo/getAllByUserId/{userId}`
- **Create To-Do**: `POST /api/ToDo/create`
- **Update To-Do**: `PUT /api/ToDo/update/{id}?userId={userId}`
- **Delete To-Do**: `DELETE /api/ToDo/delete/{userId}/{id}`

### Tools and Libraries

- **React**: Front-end framework.
- **Axios**: For making HTTP requests.
- **React Router**: For navigation between different components.
- **Toast Notifications**: To display success or error messages.

---
