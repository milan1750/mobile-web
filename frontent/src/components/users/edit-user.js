import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Navbar from "../navbar";
export default function EditUser() {
  const animatedComponents = makeAnimated();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });
  // Now im assuming that the projects are created dynamically stored in options. For this project we are more foucs on users management.
  const options = [
    { value: "100101x", label: "Collaborative Coding Environment" },
    { value: "205020z", label: " Augmented Reality in Education" },
    { value: "104051x", label: "Smart Water Management System" },
  ];
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5001/user/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      if (!user) {
        window.alert(`User with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(user);
    }
    fetchData();
    return;
  }, [params.id, navigate]);
  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      fullName: form.fullName,
      email: form.email,
    };
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5001/user/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/users");
  }
  // This following section will display the form that takes input from the user to update the data.
  return (
    <div className="container">
      <Navbar />
      <form onSubmit={onSubmit} className="py-4">
        <div className="form-group mt-4">
          <label htmlFor="title">Name: </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={form.fullName}
            onChange={(e) => updateForm({ fullName: e.target.value })}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="description">Email: </label>
          <input
            rows={10}
            type="email"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group mt-2">
          <label>Projects</label>
          <Select
            options={options}
            components={animatedComponents}
            className=""
			isMulti
          />
        </div>
        <div className="form-group mt-4">
          <input
            type="submit"
            value="Update User"
            className="btn btn-success"
          />
        </div>
      </form>
    </div>
  );
}
