import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";
// import DetailOwners from "./DetailOwners";
// import Tickets from "../tickets";

function OwnersView(props) {
  const addPet = props.addPet;
  const [errorMsg, setErrorMsg] = useState("");
  let { userID } = useParams();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    let myresponse = await Api.getUser(userID);
    if (myresponse.ok) {
      props.setUser(myresponse.data);
      setErrorMsg("");
    } else {
      props.setUser(null);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
    console.log(myresponse);
  }

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
    addPet(
      formData.name,
      formData.species,
      formData.breed,
      formData.description
    );
  }

  return (
    <div className="container">
      <h2>My Profile</h2>

      <div className="row">
        <div className="col">
          <h4>My Info</h4>
          {/* <img scr="" /> */}
          <div>
            Name: {props.user.name}
            <br />
            Username: {props.user.username}
            <br />
            Email: {props.user.email}
          </div>
        </div>
        <div className="col">
          <h4>My Pet's info</h4>
          {props.user.pets &&
            props.user.pets.map((pet) => (
              <div>
                Name: {pet.name}
                <br />
                Species: {pet.species}
                <br />
                Breed: {pet.breed}
                <br />
                Description: {pet.description}
                <br />
              </div>
            ))}
          <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default OwnersView;
