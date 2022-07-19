import react, { useState } from "react";
import { useParams } from "react-router-dom";

function NewAccommodation(props) {
  let { userID } = useParams();

  const emptyFormAccommodation = {
    image: "",
    address: "",
  };

  const emptyFormAccomodateNeeds = {
    medical: "",
    exercise: "",
    food: "",
    special: "",
  };

  const [formDataAccommodation, setFormDataAccommodatin] = useState(
    emptyFormAccommodation
  );
  const [formDataAccomodateNeeds, setFormDataAccomodateNeeds] = useState(
    emptyFormAccomodateNeeds
  );

  function handleChangeAccomodation(event) {
    let { name, value } = event.target;
    setFormDataAccommodatin((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleChangeAccommodateNeeds(event) {
    let { name, value } = event.target;

    setFormDataAccomodateNeeds((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formDataAccommodation);
    props.addAccomodation(
      formDataAccommodation.image,
      formDataAccommodation.address
    );
    props.addAccommodateNeeds(
      formDataAccomodateNeeds.medical,
      formDataAccomodateNeeds.exercise,
      formDataAccomodateNeeds.food,
      formDataAccomodateNeeds.special
    );
  }

  return (
    <div className="container">
      <h3>Add new accommodation</h3>
      <form onSubmit={handleSubmit}>
        <label>Image of accommodation:</label>
        <input
          className="form-control"
          name="image"
          required
          value={formDataAccommodation.image}
          onChange={handleChangeAccomodation}
        />
        <br />
        <label>Address of accommodation:</label>
        <input
          className="form-control"
          name="address"
          required
          value={formDataAccommodation.address}
          onChange={handleChangeAccomodation}
        />
        <br />
        <h5>Needs you can accommodate</h5>
        <label>Medical:</label>
        <input
          className="form-control"
          name="medical"
          required
          value={formDataAccomodateNeeds.medical}
          onChange={handleChangeAccommodateNeeds}
        />
        <br />
        <label>Exercise:</label>
        <input
          className="form-control"
          name="exercise"
          required
          value={formDataAccomodateNeeds.exercise}
          onChange={handleChangeAccommodateNeeds}
        />
        <br />
        <label>Food:</label>
        <input
          className="form-control"
          name="food"
          required
          value={formDataAccomodateNeeds.food}
          onChange={handleChangeAccommodateNeeds}
        />
        <br />
        <label>special:</label>
        <input
          className="form-control"
          name="special"
          required
          value={formDataAccomodateNeeds.special}
          onChange={handleChangeAccommodateNeeds}
        />
        <br />
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}

export default NewAccommodation;
