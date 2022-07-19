import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";
import { Link } from "react-router-dom";

function OwnersView(props) {
  const addPet = props.addPet;
  const addNeeds = props.addNeeds;

  const [errorMsg, setErrorMsg] = useState("");

  let [hosts, setHosts] = useState([]);

  let { userID } = useParams();

  useEffect(() => {
    getHosts();
    fetchProfile();
  }, []);

  const getHosts = () => {
    fetch("/accommodation")
      .then((response) => response.json())
      .then((hosts) => {
        setHosts(hosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  }

  const emptyForm = {
    name: "",
    species: "",
    breed: "",
    description: "",
    fk_needs: 1,
    fk_user: +userID,
  };

  const emptyFormNeeds = {
    medical: "",
    exercise: "",
    food: "",
    special: "",
  };

  const [formDataNeeds, setFormDataNeeds] = useState(emptyFormNeeds);
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

    console.log(props.user.profilePicture);
  }

  function handleChangeNeeds(event) {
    let { name, value } = event.target;

    setFormDataNeeds((data) => ({
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
      formData.description,
      formData.fk_user,
      formDataNeeds.medical,
      formDataNeeds.exercise,
      formDataNeeds.food,
      formDataNeeds.special
    );
  }

  if (!props.user) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>My Profile</h2>

      <div className="row">
        <div className="col">
          <h4>My Info</h4>
          <img className="img-fluid" src={props.user.profilePicture} />
          <div>
            Name: {props.user.name}
            <br />
            Username: {props.user.username}
            <br />
            Email: {props.user.email}
          </div>
          <br />

          <div>
            {props.user.host === 1 ? (
              <div>
                <h4>My accommodation Postings</h4>
                {hosts.map((accommodation) =>
                  accommodation.fk_user === +userID ? (
                    <div>
                      <div
                        className="row py-3"
                        key={accommodation.accommodationID}
                      >
                        <div
                          className="col-md-4 card p-4"
                          style={{ width: "25rem" }}
                        >
                          <img
                            className="card-img-top"
                            key={accommodation.accommodationID}
                            id={accommodation.accommodationID}
                            src={accommodation.photo_place}
                            alt="photo_place accommodation"
                            width="200"
                            height="200"
                          />

                          <div className="card-body">
                            <p className="card-text">
                              Adress of accommodation: {accommodation.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )
                )}
                <Link to="/NewAccomodation">
                  <button className="btn btn-primary">
                    Add new accommodation
                  </button>
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="col">
          <h4>My Pet's info</h4>
          {props.user.pets &&
            props.user.pets.map((pet) => (
              <div className="py-3">
                <div className="card p-3">
                  <h5>{pet.name}</h5>
                  Species: {pet.species}
                  <br />
                  Breed: {pet.breed}
                  <br />
                  Description: {pet.description}
                  <br />
                  <div className="pt-3">
                    <h6>My pet's needs</h6>
                    Medical: {pet.needs.medical}
                    <br />
                    Exercise: {pet.needs.exercise}
                    <br />
                    Food: {pet.needs.food}
                    <br />
                    Special: {pet.needs.special}
                  </div>
                </div>
              </div>
            ))}
          <div></div>
          <form onSubmit={handleSubmit} className="pt-4">
            <h4>Add New Pet</h4>
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

            <h6>Your pets needs </h6>

            <label>Medical:</label>
            <input
              type="text"
              name="medical"
              className="form-control"
              onChange={handleChangeNeeds}
              value={formData.medical}
            />
            <br />
            <label>Exercise:</label>
            <input
              type="text"
              name="exercise"
              className="form-control"
              onChange={handleChangeNeeds}
              value={formData.exercise}
            />
            <br />
            <label>Food:</label>
            <input
              type="text"
              name="food"
              className="form-control"
              onChange={handleChangeNeeds}
              value={formData.food}
            />
            <br />
            <label>Special:</label>
            <input
              type="text"
              name="special"
              className="form-control"
              onChange={handleChangeNeeds}
              value={formData.special}
            />
            <br />
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnersView;
