// this is parent | this is front end
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HostsView from "./HostsView";
import OwnersView from "./OwnersView";
import "./App.css";
import NavBar from "./navbar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="HostsView" element={<HostsView />} />
        <Route path="OwnersView" element={<OwnersView />} />
        {/* route for detailHosts */}
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <main className="masthead">
        <h3>Welcome to the Homepage</h3>
        <div class="color-overlay d-flex justify-content-center align-items-center">
          <h1>Pet Hotel</h1>
        </div>
      </main>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          This application is useful for pet owners and pet lovers you can
          contact to cover all your pet needs while you are not with them. "PET
          HOTEL", the pet accommodation App works as a tool to find the best
          place for your pet to stay. Click, connect! and pick up your friend
          when you get back."PET HOTEL" provides you with important information
          on the care and needs of pets, ensuring coverage for all their
          requirements.
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      {/* Add Image */}
      <main className="masthead-about">
        <h3>Welcome to the Homepage</h3>
        <div class="color-overlay d-flex justify-content-center align-items-center">
          <h1>Pet Hotel</h1>
        </div>
      </main>
    </>
  );
}

export default App;
