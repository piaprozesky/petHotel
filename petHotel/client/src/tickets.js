import React from "react";
import { Link } from "react-router-dom";

function Tickets(props) {
  return (
    <div className="row">
      <div className="card">
        {props.owners &&
          props.owners.map((owners) => (
            <div
              className="col-sm-6 col-lg-3 col-mb-3 d-flex justify-content-evenly"
              key={owners.id}
            >
              <div
                className="card ms-2 text-center p-3"
                style={{ width: "25rem" }}
              >
                <img
                  className="card-img-top"
                  key={owners.id}
                  id={owners.id}
                  src={owners.image}
                  alt="Owner Picture"
                />

                <div className="card-body">
                  <h5 className="card-title">{owners.name}</h5>
                  <p className="card-text">
                    Adress of accommodation: {owners.adress}
                  </p>
                </div>

                <div>
                  <Link to={"/owners/" + owners.id}>
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
  );
}
export default Tickets;
