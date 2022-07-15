import React, { useEffect, useState } from "react";
// import DetailHosts from "./DetailHosts";
import Cards from "../cards";

export default function HostsView() {
  const [host, setHost] = useState({
    adress: "",
    name: "",
    foto_hosts: "",
    foto_place: "",
  });

  let [hosts, setHosts] = useState([]);

  useEffect(() => {
    getHosts();
  }, []);

  const addHost = async (newHost) => {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHost),
    };
    try {
      let response = await fetch("/accommodation/", options);
      if (response.ok) {
        let data = await response.json();
        setHosts(data);
      } else {
        console.log(`server error: ${response.statud} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

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

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setHost((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHost(host);
  };

  return (
    <div>
      <main>
        <h1>Hello Host</h1>
      </main>
      <div>
        <h2>See what others like you are posting!</h2>
        <Cards hosts={hosts} />
        {/* <DetailHosts hosts={hosts} /> */}
        <form className="mb-3 row g-3" onSubmit={handleSubmit}>
          <label className="form-label">
            Whats your name?
            <input name="name" value={host.name} onChange={handleInputChange} />
          </label>
          <br />
          <label className="form-label">
            Upload a picture of you
            <input
              name="foto_hosts"
              value={host.foto_hosts}
              onChange={handleInputChange}
            />
          </label>
          <label className="form-label">
            Upload a picture of your accommodation
            <input
              name="foto_place"
              value={host.foto_place}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label className="form-label">
            What's the accommodation adress?
            <textarea
              name="adress"
              value={host.adress}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
