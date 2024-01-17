import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
// We import all the components we need in our app
import Login from "./components/login";

import "./App.css";
import RegisterUser from "./components/users/registerUser";
import UserList from "./components/users/users";
import EditUser from "./components/users/edit-user";
const App = () => {
  return (
    <div>
      <Routes>
        {/* Login */}
        <Route exact path="/login" element={<Login />} />

        {/* Users */}
        <Route exact path="/users/register" element={<RegisterUser />} />
        <Route exact path="/users" element={<UserList />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
};
export default App;
