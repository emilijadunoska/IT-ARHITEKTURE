import React, { useEffect, useState } from "react";

const ViewMembershipComponent = () => {
  const [memberships, setMemberships] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  useEffect(() => {
    const fetchMembershipByUserId = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/getMembershipByUserId/?userId=${userId}`
        );
        const membershipObj = await response.json();
        const membershipArray = membershipObj.array;

        const membership = {
          id: membershipArray[0],
          userid: membershipArray[1],
          type: membershipArray[2],
          price: membershipArray[3],
          startDate: membershipArray[4],
          endDate: membershipArray[5],
        };

        console.log("membership user id: ", membership.userid);
        console.log("user id: ", user.id);

        if (membership.userid === user.id) {
          localStorage.setItem("userMembership", JSON.stringify(membership));
          setMemberships([membership]);
        }
      } catch (error) {
        console.error(`Error fetching membership`, error);
      }
    };

    fetchMembershipByUserId(user.id);
  }, [user]);

  const handleUpdateMembership = async (membershipId) => {
    const updatedEndDate = "new end date2";

    try {
      const response = await fetch(`http://localhost:3000/updateMembership`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: membershipId, endDate: updatedEndDate }),
      });

      if (response.ok) {
        alert(
          "Membership extended successfully please refresh to see the changes"
        );
        const updatedMembership = await response.json();

        setMemberships((prevMemberships) =>
          prevMemberships.map((membership) =>
            membership.id === membershipId ? updatedMembership : membership
          )
        );

        localStorage.setItem(
          "memberships",
          JSON.stringify(
            memberships.map((membership) =>
              membership.id === membershipId ? updatedMembership : membership
            )
          )
        );
      } else {
        console.error("Failed to update membership:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating membership:", error);
    }
  };

  const handleDeleteMembership = async (membershipId) => {
    try {
      await fetch(`http://localhost:3000/delete?id=${membershipId}`, {
        method: "DELETE",
      });
      alert("Membership deleted successfully");

      setMemberships("");

      localStorage.removeItem("userMembership");
    } catch (error) {
      console.error("Error deleting membership:", error);
    }
  };

  return (
    <div>
      <h1>Your active Memberships: </h1>
      {memberships.length > 0 ? (
        <ul>
          {memberships.map((membership) => (
            <li key={membership.id}>
              <div>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </div>
              <div>
                <strong>Membership id:</strong> {membership.id}
              </div>
              <div>
                <strong>Membership Type:</strong> {membership.type}
              </div>
              <div>
                <strong>Price:</strong> {membership.price}
              </div>
              <div>
                <strong>Start Date:</strong> {membership.startDate}
              </div>
              <div>
                <strong>End Date:</strong> {membership.endDate}
              </div>
              <div>
                <div>
                  <button onClick={() => handleUpdateMembership(membership.id)}>
                    Extend Membership
                  </button>
                </div>
                <div>
                  {" "}
                  <button onClick={() => handleDeleteMembership(membership.id)}>
                    Delete Membership
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active memberships found.</p>
      )}
    </div>
  );
};

export default ViewMembershipComponent;
