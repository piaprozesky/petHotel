import React, { useEffect, useState } from "react";

function DetailOwners({ owners }) {
  const [detailed, setDetailed] = useState([]);

  return (
    <div>
      {owners && (
        <>
          {owners.map((owner, i) => (
            <img
              src={owner.photo_place}
              onClick={() => setDetailed(owner)}
              key={i}
            />
          ))}
        </>
      )}
      <DetailOwners owners={owners} />
    </div>
  );
}

export default DetailOwners;
