import React, { lazy, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";

const Membership = lazy(() => import("MembershipApp/Membership"));
const User = lazy(() => import("UserApp/User"));
const GroupClass = lazy(() => import("GroupClassApp/GroupClass"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setfirstName] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setfirstName(loggedInUser.firstName);
    }
  }, []);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} firstName={firstName} />
      <React.Suspense
        fallback={<div>Loading users, memberships and group classes...</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/membership/*" element={<Membership />} />
          <Route path="/groupclass/*" element={<GroupClass />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </div>
  );
}

export default App;
