import React from "react";
import { Link } from "react-router-dom";

function Cards(props) {
  return (
    <div className="container">
      {props.hosts &&
        props.hosts.map((hosts) => (
          <div className="row" key={hosts.id}>
            <div className="col-md-4" style={{ width: "25rem" }}>
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
