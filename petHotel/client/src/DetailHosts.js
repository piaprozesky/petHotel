import React, { useEffect, useState } from "react";

function DetailHosts({ hosts }) {
  const [detailed, setDetailed] = useState([]);

  return (
    <div className="DetailHosts">
      {hosts && (
        <>
          {/* <h2>{detailed.name}</h2>
          <img src={detailed.foto_hosts} alt="text" />
          <img src={detailed.foto_place} alt="text" /> */}
          {hosts.map((host, i) => (
            <img
              src={host.foto_place}
              onClick={() => setDetailed(host)}
              key={i}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default DetailHosts;
