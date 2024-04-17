import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import PurchaseMembershipComponent from "./components/PurchaseMembershipComponent";
import ViewMembershipComponent from "./components/ViewMembershipComponent";

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
      {isLoggedIn ? (
        <>
          <div>
            <Link to="view">View Active Membership</Link>
          </div>
          <div>
            <Link to="purchase">Purchase Membership</Link>
          </div>
        </>
      ) : (
        <div>Please log in to view your membership or to purchase</div>
      )}

      <Routes>
        <Route path="view" element={<ViewMembershipComponent />} />
        <Route path="purchase" element={<PurchaseMembershipComponent />} />
      </Routes>
    </div>
  );
}

export default App;
