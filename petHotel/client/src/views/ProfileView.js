import React, { useEffect, useState, useParams } from "react";
import Api from "../helpers/Api";
// import DetailOwners from "./DetailOwners";
// import Tickets from "../tickets";

function OwnersView() {
  const emptyForm = {
    name: "",
    species: "",
    breed: "",
    description: "",
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
    // formData.name, formData.species, formData.breed, formData.description;
  }

  return (
    <div className="container">
      <h2>My Profile</h2>

      <div className="row">
        <h5 className="col">My Info</h5>
        <form className="col" onSubmit={handleSubmit}>
          <h5>My Pet's info</h5>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            value={formData.name}
          />
          <br />
          <label>Species:</label>
          <input
            type="text"
            name="species"
            className="form-control"
            onChange={handleChange}
            value={formData.species}
          />
          <br />
          <label>Breed:</label>
          <input
            type="text"
            name="breed"
            className="form-control"
            onChange={handleChange}
            value={formData.breed}
          />
          <br />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            className="form-control"
            onChange={handleChange}
            value={formData.description}
          />
          <br />
          <button className="btn btn-primary">Add New Pet</button>
        </form>
      </div>
    </div>
  );
}

export default OwnersView;
