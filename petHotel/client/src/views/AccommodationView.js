import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <main>
        <h1>Pet Accommodation</h1>
      </main>
      <div>
        <div className="container">
          {hosts &&
            hosts.map((hosts) => (
              <div className="row" key={hosts.id}>
                <div className="col-md-4 card" style={{ width: "25rem" }}>
                  <img
                    className="card-img-top"
                    key={hosts.id}
                    id={hosts.id}
                    src={hosts.photo_place}
                    alt="photo_place accommodation"
                  />

                  <div className="card-body">
                    <h5 className="card-title">{hosts.name}</h5>
                    <p className="card-text">
                      Adress of accommodation: {hosts.address}
                    </p>
                  </div>

                  <div>
                    <Link to={"/accommodation/details" + hosts.id}>
                      <button className="btn btn-outline-primary">
                        See details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
