import React, { useEffect, useState } from "react";
import DetailOwners from "./DetailOwners";
import Tickets from "./tickets";

export default function OwnersView({ addOwner }) {
  const [owner, setOwner] = useState({
    adress: "",
    name: "",
    image: "",
  });

  const handleAddOwner = (newOwner) => {
    setOwner((state) => [...state, newOwner]);
  };

  let [owners, setOwners] = useState([]);

  useEffect(() => {
    // help me fetch the function
    getOwners();
  }, []);

  const getOwners = () => {
    fetch("/owners")
      .then((response) => response.json())
      .then((owners) => {
        setOwners(owners);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setOwner((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOwner(owners);
  };

  return (
    <div>
      <main>
        <h1>Hello Owner</h1>
      </main>
      <div>
        <h2>See what others like you are posting!</h2>
        <DetailOwners addOwner={handleAddOwner} owners={owners} />
        <form onSubmit={handleSubmit}>
          <label>
            Whats your name?
            <input
              name="name"
              value={owner.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Upload a picture of you and your pet
            <input
              name="image"
              value={owner.image}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Where do you live?
            <textarea
              name="adress"
              value={owner.adress}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
