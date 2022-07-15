import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

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
      <main className="masthead-about">
        {/* <h3>Welcome to the Homepage</h3> */}
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <h1>Pet Hotel</h1>
        </div>
      </main>
    </>
  );
}

export default About;
