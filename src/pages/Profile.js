import React from "react";
import { auth } from "../firebase";

const Profile = () => {
  const user = auth.currentUser;
  return (
    <div style={{ padding: "20px" }}>
      <h2>Profile</h2>
      <p>Name: {user?.displayName}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;