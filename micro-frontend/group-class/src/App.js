import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import GroupClass from "./pages/groupClass";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="MembershipApp">
      <div className="centered">
        {isLoggedIn ? (
          <GroupClass />
        ) : (
          <p>You must be logged in to access this page.</p>
        )}
      </div>

      <Routes>
        {isLoggedIn && <Route path="groupClass" element={<GroupClass />} />}
      </Routes>
    </div>
  );
}

export default App;
