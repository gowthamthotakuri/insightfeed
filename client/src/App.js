import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/header";
import Login from "./components/auth/Login/index (1)";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [user, setUser] = useState(localStorage.getItem("token"));

  const handleSearchButtonClick = (searchInput) => {
    setSelectedTopic(searchInput);
  };

  const handleUserLogin = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <React.Fragment>
      <header>
        <Header
          onSearchButtonClick={handleSearchButtonClick}
          user={user}
          onLogout={handleUserLogout}
        />
      </header>
      <main>
        <Routes>
          <Route
            path="/welcome"
            element={
              user ? (
                <Welcome selectedTopic={selectedTopic} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
