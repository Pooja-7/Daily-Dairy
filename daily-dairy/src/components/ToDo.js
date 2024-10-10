import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updateId, setUpdateId] = useState(null); // ID of the todo item to update
  const [updateTitle, setUpdateTitle] = useState(""); // Title of the todo item being updated
  const [isCompleted, setIsCompleted] = useState(false); // Completion status
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch to-dos from API
  const fetchTodos = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found in local storage.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5174/api/ToDo/getAllByUserId/${userId}`
      );
      if (response.status === 200) {
        setTodos(response.data.data || []); // Use the 'data' field from the response
      } else {
        setError("Failed to fetch todos.");
      }
    } catch (error) {
      setError("Error fetching todos: " + error.message);
    }
  };

  // Create a new to-do
  const createTodo = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found in local storage.");
      return; // Handle the case where userId is not available
    }

    try {
      const response = await axios.post(
        "http://localhost:5174/api/ToDo/create",
        {
          title: newTodo,
          isCompleted: false, // Default to false for new todos
          userId: userId,
        }
      );
      if (response.status === 201) {
        fetchTodos(); // Refresh the to-do list
        setNewTodo(""); // Clear the input field
      } else {
        setError("Failed to create todo.");
      }
    } catch (error) {
      setError("Error creating todo: " + error.message);
    }
  };

  // Update a to-do
  const updateTodo = async (id) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found in local storage.");
      return; // Handle the case where userId is not available
    }

    try {
      const response = await axios.put(
        `http://localhost:5174/api/ToDo/update/${id}?userId=${userId}`, // Updated URL
        {
          id: id, // Include ID in the request body
          title: updateTitle, // Updated title from input
          isCompleted: isCompleted, // Updated completion status from radio buttons
          userId: userId, // Include userId in the request body
        }
      );

      if (response.status === 204) {
        fetchTodos(); // Refresh the to-do list
        setUpdateId(null); // Reset update ID
        setUpdateTitle(""); // Clear update title input
        setIsCompleted(false); // Reset completion status
      } else {
        setError("Failed to update todo.");
      }
    } catch (error) {
      setError("Error updating todo: " + error.message);
    }
  };

  // Delete a to-do
  const deleteTodo = async (id) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found in local storage.");
      return; // Handle the case where userId is not available
    }

    try {
      const response = await axios.delete(
        `http://localhost:5174/api/ToDo/delete/${userId}/${id}`
      );

      if (response.status === 204) {
        fetchTodos(); // Refresh the to-do list after deletion
      } else {
        setError("Failed to delete todo.");
      }
    } catch (error) {
      setError("Error deleting todo: " + error.message);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("userId"); // Clear user ID
    localStorage.removeItem("token"); // Clear token if you have one
    navigate("/"); // Redirect to the landing page or login page
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <button onClick={logout}>Logout</button> {/* Logout button */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={createTodo}>Create Todo</button>
      {todos.length === 0 ? (
        <p>No todos available. Please create one.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} - {todo.isCompleted ? "Completed" : "Not Completed"}
              <button
                onClick={() => {
                  setUpdateId(todo.id); // Set ID to update
                  setUpdateTitle(todo.title); // Set current title for update
                  setIsCompleted(todo.isCompleted); // Set current completion status
                }}
              >
                Update
              </button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {updateId && (
        <div>
          <h2>Update To-Do</h2>
          <input
            type="text"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            placeholder="Update title"
          />
          <label>
            <input
              type="radio"
              value="true"
              checked={isCompleted === true}
              onChange={() => setIsCompleted(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={isCompleted === false}
              onChange={() => setIsCompleted(false)}
            />
            No
          </label>
          <button onClick={() => updateTodo(updateId)}>Submit Update</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ToDo;
