import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import AccommodationView from "./views/AccommodationView";
import ProfileView from "./views/ProfileView";

import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import ABoutView from "./views/AboutView";
import RegisterView from "./views/RegisterView";
import NewAccommodation from "./views/NewAccommodationView";
import DetailHosts from "./views/DetailHosts";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/navbar";

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

  async function addPet(
    name,
    species,
    breed,
    description,
    fk_user,
    medical,
    exercise,
    food,
    special
  ) {
    let myresponse = await Api.newPet(
      name,
      species,
      breed,
      description,
      fk_user,
      medical,
      exercise,
      food,
      special
    );
  }

  async function addAccomodation(address, photo_place) {
    let myresponse = await Api.newAccomodation(
      address,
      photo_place,
      user.userID
    );
    console.log(typeof user.userID);
  }

  async function addAccommodateNeeds(medical, exercise, food, special) {
    let myresponse = await Api.newAccommodateNeeds(
      medical,
      exercise,
      food,
      special
    );
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

        <Route
          path="NewAccomodation"
          element={
            <NewAccommodation
              addAccomodation={addAccomodation}
              addAccommodateNeeds={addAccommodateNeeds}
            />
          }
        />
        <Route path="/accommodation/DetailHosts" element={<DetailHosts />} />
      </Routes>
    </div>
  );
}

export default App;
