import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../navbar";

// This following section will display the form that takes the input from the user.
export default function RegisterUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    fullName: "",
    password: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    const validateUser = { ...form };
    await fetch("http://localhost:5001/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateUser),
    }).catch((error) => {
      window.alert(error.message);
      return;
    });
    setForm({ name: "", password: "", fullName: "", email: "" });
    navigate("/users");
  }

  return (
    <>
      <div className="container">
        <Navbar />
        <form onSubmit={onSubmit} className="py-4">
          <h4 className="mt-4">Add new employee/user</h4>
          <div className="form-group mt-4">
            <label htmlFor="fullName">Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={form.fullName}
              onChange={(e) => updateForm({ fullName: e.target.value })}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password">Temporary Password </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
            <button className="btn btn-sm btn-primary mt-2">
              Auto Generate
            </button>
          </div>
          <div className="form-group mt-4">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="type" />
              <label class="form-check-label" for="type">
                Check if the user is an employee
              </label>
            </div>
          </div>
          <div className="form-group mt-4">
            <input className="btn btn-success" type="submit" value="Register New User" />
          </div>
        </form>
      </div>
    </>
  );
}
