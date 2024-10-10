import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleSignUp = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <div>
      <h1>Welcome to Daily Dairy</h1>
      <p>Please choose an option:</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default LandingPage;
