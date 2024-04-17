import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import GroupClassesComponent from "./components/GroupClassesComponent";

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
          <GroupClassesComponent />
        ) : (
          <p>You must be logged in to access this page.</p>
        )}
      </div>

      <Routes>
        {isLoggedIn && (
          <Route path="groupClass" element={<GroupClassesComponent />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
