import React, { useEffect, useState } from "react";

function DetailOwners({ owners }) {
  const [detailed, setDetailed] = useState([]);

  return (
    <div>
      {owners && (
        <>
          {/* <h2>{detailed.name}</h2>
          <img src={detailed.image} alt="text" /> */}
          {owners.map((owner, i) => (
            <img src={owner.image} onClick={() => setDetailed(owner)} key={i} />
          ))}
        </>
      )}
    </div>
  );
}

export default DetailOwners;
