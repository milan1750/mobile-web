import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Navbar from "../navbar";
const Record = (props) => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.fullName}</td>
    <td>{props.user.email}</td>
    <td>
      <span
        className={
          props.user.type === "Admin"
            ? "badge bg-danger text-white p-1"
            : props.user.type === "Employee"
            ? "badge bg-info text-white p-1"
            : "badge bg-success text-white p-1"
        }
      >
        {props.user.type}
      </span>
    </td>
    <td>
      <Link className="btn btn-link" to={`/edit-user/${props.user._id}`}>
        Edit
      </Link>
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);
export default function UserList() {
  const [users, setfullName] = useState([]);
  // This method fetches the users from the database.
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:5001/users/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const users = await response.json();
      setfullName(users);
    }
    getUsers();
    return;
  }, [users.length]);

  // This method will delete a user
  async function deleteUser(id) {
    await fetch(`http://localhost:5001/user/${id}`, { method: "DELETE" });
    const newfullName = users.filter((el) => el._id !== id);
    setfullName(newfullName);
  }
  // This method will map out the users on the table
  function UserList() {
    return users.map((user) => {
      return (
        <Record
          user={user}
          deleteUser={() => deleteUser(user._id)}
          key={user._id}
        />
      );
    });
  }
  // This following section will display the table with the users of individuals.
  return (
    <div className="container">
      <Navbar />
      <table className="table table-bordered mt-5">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{UserList()}</tbody>
      </table>
    </div>
  );
}
