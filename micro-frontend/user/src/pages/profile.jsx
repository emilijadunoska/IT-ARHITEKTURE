import React, { useState } from "react";

const Profile = ({ userProfile, onUpdateProfile, onDeleteProfile }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
  });

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${userProfile.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const updatedProfile = await response.json();
        onUpdateProfile(updatedProfile);
        setEditMode(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${userProfile.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          onDeleteProfile();
        } else {
          console.error("Failed to delete profile");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  const renderViewMode = () => {
    return (
      <div>
        <h1>My Profile</h1>
        <p>Name: {userProfile.firstName}</p>
        <p>Last Name: {userProfile.lastName}</p>
        <p>Email: {userProfile.email}</p>
        <button onClick={handleEdit}>Edit Profile</button>
        <button onClick={handleDelete}>Delete Profile</button>
      </div>
    );
  };

  const renderEditMode = () => {
    return (
      <div>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Profile</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      </div>
    );
  };

  return <div>{editMode ? renderEditMode() : renderViewMode()}</div>;
};

export default Profile;
