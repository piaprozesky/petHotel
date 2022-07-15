import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import RegisterView from "./RegisterView";

function LoginView(props) {
  const login = props.login;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "usernameInput":
        setUsername(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(username, password);
  }

  return (
    <div>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="usernameInput"
          required
          value={username}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          name="passwordInput"
          required
          value={password}
          onChange={handleChange}
        />
        <button>LOGIN</button>
      </form>
      <nav>
        <Link to="/RegisterView">Don't have an account yet? Register here</Link>
      </nav>
    </div>
  );
}

export default LoginView;
