import React from "react";
import { Link } from "react-router-dom";
// import { getHosts, hosts } from "./HostsView";

function Cards(props) {
  return (
    <div className="card">
      {props.hosts &&
        props.hosts.map((hosts) => (
          <div
            className="col-sm-6 col-lg-3 mb-3 d-flex justify-content-evenly"
            key={hosts.id}
          >
            <div
              className="card ms-2 text-center p-3"
              style={{ width: "25rem" }}
            >
              <img
                className="card-img-top"
                key={hosts.id}
                id={hosts.id}
                src={hosts.foto_place}
                alt="image accomodation"
              />

              <div className="card-body">
                <h5 className="card-title">{hosts.name}</h5>
                <p className="card-text">
                  Adress of accomodation: {hosts.adress}
                </p>
              </div>

              <div className="card-footer">
                <Link to={"/hosts/" + hosts.id}>
                  <button className="btn btn-outline-primary">
                    See details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
export default Cards;
