import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import AccommodationView from "./views/AccommodationView";
import ProfileView from "./views/ProfileView";
import NavBar from "./components/navbar";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import ABoutView from "./views/AboutView";
import RegisterView from "./views/RegisterView";

import PrivateRoute from "./components/PrivateRoute";
// import DetailHosts from "./DetailHosts";
// import DetailOwners from "./DetailOwners";

import "./App.css";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const navigate = useNavigate();

  async function login(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  async function register(username, name, password, email, host) {
    let myresponse = await Api.newUser(username, name, password, email, host);
  }

  async function addPet(name, species, breed, description) {
    let myresponse = await Api.newPet(name, species, breed, description);
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  return (
    <div className="App">
      <NavBar logout={doLogout} user={user} />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="about" element={<ABoutView />} />
        <Route path="AccommodationView" element={<AccommodationView />} />
        <Route
          path="/users/:userID"
          element={
            <PrivateRoute>
              <ProfileView addPet={addPet} user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<LoginView login={login} />} />
        <Route
          path="RegisterView"
          element={<RegisterView register={register} />}
        />

        {/* <Route path="/accommodation/:id" element={DetailHosts />} />
        <Route path="/owners/:id" element={DetailOwners />} /> */}
      </Routes>
    </div>
  );
}

export default App;
