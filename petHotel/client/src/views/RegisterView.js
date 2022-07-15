import React, { useState } from "react";

function RegisterView(props) {
  const register = props.register;

  const emptyForm = {
    name: "",
    email: "",
    username: "",
    password: "",
    host: 0,
  };

  const [formData, setFormData] = useState(emptyForm);

  function handleChange(event) {
    if ((formData.host = true)) {
      formData.host = 1;
    } else {
      formData.host = 0;
    }
    let { name, value } = event.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    register(
      formData.username,
      formData.name,
      formData.password,
      formData.email,
      formData.host
    );
  }

  return (
    <div className="container">
      <h4>Register</h4>
      <form onSubmit={handleSubmit} className="row">
        <label>Name:</label>
        <input
          className="form-control"
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          className="form-control"
          type="text"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label>Username:</label>
        <input
          className="form-control"
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          className="form-control"
          type="text"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <input
          className="form-check-input"
          type="checkbox"
          name="host"
          value={formData.host}
          onChange={handleChange}
        ></input>
        <label>I would like to be a host</label>
        <br />
        <button className="btn btn-primary">REGISTER</button>
      </form>
    </div>
  );
}

//username, name, hashPass, email, host
export default RegisterView;
