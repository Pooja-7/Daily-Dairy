import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login"; // You'll need to create this if it doesn't exist
import LandingPage from "./components/LandingPage"; // LandingPage component
import ToDo from "./components/ToDo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
        <Route path="/signup" element={<SignUp />} /> {/* Sign Up Page */}
        <Route path="/login" element={<Login />} /> {/* Login Page */}
        <Route path="/todo" element={<ToDo />} /> {/* Todo Page */}
      </Routes>
    </Router>
  );
};

export default App;
