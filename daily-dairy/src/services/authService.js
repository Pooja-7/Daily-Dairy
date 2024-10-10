import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Change to named import

const API_URL = "http://localhost:5174/api/Auth/";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  console.log("Response is" + response);
  if (response.data && response.data.token) {
    // Decode the JWT to get the 'sub' value
    const decodedToken = jwtDecode(response.data.token);
    const userId = decodedToken.sub;

    // Save the token and userId in localStorage or session storage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", userId);

    return response.data;
  }

  throw new Error("Registration failed");
};

export const fetchTodos = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(
    `http://localhost:5174/api/todos?userId=${userId}`
  );

  if (response.data.success) {
    return response.data.data; // Return the todos array
  }

  throw new Error("Failed to fetch todos");
};

// New login service
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}login`, credentials);
  if (response.data && response.data.token) {
    // Decode the JWT to get the 'sub' value
    const decodedToken = jwtDecode(response.data.token);
    const userId = decodedToken.sub;

    // Save the token and userId in localStorage or session storage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", userId);

    return response.data;
  }

  throw new Error("Login failed");
};
