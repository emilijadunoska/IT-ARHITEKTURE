import React, { useState, useEffect } from "react";

function PurchaseMembership() {
  const [existingMembership, setExistingMembership] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [membershipType, setMembershipType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      console.log("Logged in user: ", loggedInUser);
      const existingMembership = JSON.parse(
        localStorage.getItem("userMembership")
      );
      console.log("Existing membership: ", existingMembership);
      if (existingMembership) {
        if (existingMembership.userid === loggedInUser.id) {
          console.log("User already has a membership.");
          setExistingMembership(true);
        } else {
          setExistingMembership(false);
        }
      } else {
        setExistingMembership(false);
      }
    }
  }, []);

  const handlePurchase = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const membershipData = {
      userid: userId,
      type: membershipType,
      price: 50,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(membershipData),
      });

      if (response.ok) {
        setPurchaseStatus("Membership purchased successfully!");

        const getMembershipResponse = await fetch(
          `http://localhost:3000/getMembershipByUserId/?userId=${userId}`
        );
        if (getMembershipResponse.ok) {
          const membershipObj = await getMembershipResponse.json();

          const membershipArray = membershipObj.array;

          const membership = {
            id: membershipArray[0],
            userid: membershipArray[1],
            type: membershipArray[2],
            price: membershipArray[3],
            startDate: membershipArray[4],
            endDate: membershipArray[5],
          };

          localStorage.setItem("userMembership", JSON.stringify(membership));
        } else {
          console.error("Failed to fetch membership by user ID.");
        }
      } else {
        setPurchaseStatus("Failed to purchase membership. Please try again.");
      }
    } catch (error) {
      console.error("Error purchasing membership:", error);
      setPurchaseStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      {existingMembership ? (
        <p>You already have an active membership.</p>
      ) : (
        <>
          <br />
          <label>
            Membership Type:
            <input
              type="text"
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
            />
          </label>
          <br />
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <br />
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handlePurchase}>Purchase Membership</button>
          {purchaseStatus && <p>{purchaseStatus}</p>}
        </>
      )}
    </div>
  );
}

export default PurchaseMembership;
