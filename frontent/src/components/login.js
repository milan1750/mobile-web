import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Form Submission
  async function onSubmit(e) {
    e.preventDefault();
    const validateUser = { ...form };
    let message = await fetch("http://localhost:5001/user/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    if (message.ok) {
      setForm({ name: "", password: "" });
      navigate("/");
    } else {
      console.log(message);
      alert("Username or Password Invalid");
    }
  }

  return (
    <div className="login-container p-0 m-0">
      <div className="container-fluid">
        <div className="row">
          <div className="logo col-md-6 m-0 p-0">
			<img src="https://www.officelovin.com/wp-content/uploads/2018/12/hill-knowlton-main-office.jpg" alt="" />
		  </div>
          <div className="col-md-6">
            <form onSubmit={onSubmit} className="login-form py-4">
              <h3 className="text-center">Hill & Knowlton</h3>
			  <h5 className="text-center bg-success text-white">Knowledge Management System</h5>
              <div className="form-group mt-4">
                <label htmlFor="name">Username OR Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
                <br />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  value={form.password}
                  onChange={(e) => updateForm({ password: e.target.value })}
                />
                <br />
              </div>
              <div className="form-group">
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
