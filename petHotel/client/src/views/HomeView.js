import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
function Home() {
  return (
    <>
      <main className="masthead">
        <h3>Welcome to the Homepage</h3>
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <h1>Pet Hotel</h1>
        </div>
      </main>
    </>
  );
}

export default Home;
