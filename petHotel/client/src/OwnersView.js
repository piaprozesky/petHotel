import React, { useEffect, useState } from "react";
import DetailOwners from "./DetailOwners";
import Tickets from "./tickets";

export default function OwnersView() {
  const [owner, setOwner] = useState({
    adress: "",
    name: "",
    image: "",
  });

  let [owners, setOwners] = useState([]);

  useEffect(() => {
    // help me fetch the function
    getOwners();
  }, []);

  const addOwner = async (newOwner) => {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOwner),
    };
    try {
      let response = await fetch("/owners/", options);
      if (response.ok) {
        let data = await response.json();
        setOwners(data);
      } else {
        console.log(`server error: ${response.statud} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

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
    addOwner(owner);
  };

  return (
    <div>
      <main>
        <h1>Hello Owner</h1>
      </main>
      <div>
        <h2>See what others like you are posting!</h2>
        <Tickets owners={owners} className="masthead-owners" />
        {/* <DetailOwners owners={owners} /> */}
        <div>
          <form class="mb-3 row g-3" onSubmit={handleSubmit}>
            <label class="form-label">
              Whats your name?
              <input
                name="name"
                value={owner.name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label class="form-label">
              Upload a picture of you and your pet
              <input
                name="image"
                value={owner.image}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label class="form-label">
              Where do you live?
              <textarea
                name="adress"
                value={owner.adress}
                onChange={handleInputChange}
              ></textarea>
            </label>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
