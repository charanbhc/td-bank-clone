import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div style={{ padding: "10px" }}>
      <Link to="/dashboard">BankApp</Link> | <Link to="/transfer">Transfer</Link> | <Link to="/profile">Profile</Link>
      <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
    </div>
  );
};

export default Navbar;