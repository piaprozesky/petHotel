import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DetailHosts from "./DetailHosts";
import "../App.css";

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
        <h1 className="py-4">Pet Accommodation</h1>
      </main>
      <div>
        <div className="container">
          <div className="row">
            {hosts &&
              hosts.map((hosts) => (
                <div className="col-md-3 py-2" key={hosts.id}>
                  <div>
                    <div className="card p-4">
                      <img
                        className="card-img-top"
                        key={hosts.id}
                        id={hosts.id}
                        src={hosts.photo_place}
                        alt="photo_place accommodation"
                        width="200"
                        height="200"
                      />

                      <div className="card-body">
                        <h5 className="card-title">{hosts.name}</h5>
                        <p className="card-text">
                          Adress of accommodation: {hosts.address}
                        </p>
                      </div>

                      <div>
                        <Link to={"/accommodation/DetailHosts" + hosts.id}>
                          <button className="btn btn-outline-primary">
                            See details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
