import React, { useState, useEffect } from "react";

const GroupClassesComponent = () => {
  const [groupClasses, setGroupClasses] = useState([]);
  const [userBookedClasses, setUserBookedClasses] = useState([]);

  const fetchGroupClasses = async () => {
    try {
      const response = await fetch("http://localhost:3000/groupclass");
      if (response.ok) {
        const data = await response.json();
        setGroupClasses(data);
      } else {
        console.error("Failed to fetch group classes.");
      }
    } catch (error) {
      console.error("Error fetching group classes:", error);
    }
  };

  useEffect(() => {
    fetchGroupClasses();
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const filteredClasses = groupClasses.filter((groupClass) =>
      groupClass.attendees.includes(loggedInUser.id)
    );
    setUserBookedClasses(filteredClasses);
  }, [groupClasses]);

  const bookClass = async (classId) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const updatedAttendees = [
      ...groupClasses.find((c) => c.id === classId).attendees,
      loggedInUser.id,
    ];

    try {
      const response = await fetch(
        `http://localhost:3000/groupclass/${classId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attendees: updatedAttendees }),
        }
      );

      if (response.ok) {
        console.log(`Class with ID ${classId} booked successfully.`);
        fetchGroupClasses();
      } else {
        console.error(`Failed to book class with ID ${classId}.`);
      }
    } catch (error) {
      console.error("Error booking class:", error);
    }
  };

  const unenroll = async (classId) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const updatedAttendees = groupClasses
      .find((c) => c.id === classId)
      .attendees.filter((id) => id !== loggedInUser.id);

    try {
      const response = await fetch(
        `http://localhost:3000/groupclass/${classId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attendees: updatedAttendees }),
        }
      );

      if (response.ok) {
        console.log(`Unenrolled from class with ID ${classId} successfully.`);
        fetchGroupClasses();
      } else {
        console.error(`Failed to unenroll from class with ID ${classId}.`);
      }
    } catch (error) {
      console.error("Error unenrolling from class:", error);
    }
  };

  return (
    <div className="centered">
      <h1>Group Classes</h1>
      <div style={{ display: "flex" }}>
        <div className="group-class-list">
          <h2>All Scheduled Group Classes</h2>
          <ul>
            {groupClasses.map((groupClass) => (
              <li key={groupClass.id}>
                <strong>Name:</strong> {groupClass.name}
                <br />
                <strong>Description:</strong> {groupClass.description}
                <br />
                <strong>Instructor:</strong> {groupClass.instructor}
                <br />
                <strong>Capacity:</strong> {groupClass.capacity}
                <br />
                <button onClick={() => bookClass(groupClass.id)}>
                  Book this class
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="group-class-list">
          <h2>Group classes you have booked: </h2>
          <ul>
            {userBookedClasses.map((bookedClass) => (
              <li key={bookedClass.id}>
                <strong>Name:</strong> {bookedClass.name}
                <br />
                <strong>Description:</strong> {bookedClass.description}
                <br />
                <strong>Instructor:</strong> {bookedClass.instructor}
                <br />
                <strong>Capacity:</strong> {bookedClass.capacity}
                <br />
                <button onClick={() => unenroll(bookedClass.id)}>
                  Unenroll me
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GroupClassesComponent;
