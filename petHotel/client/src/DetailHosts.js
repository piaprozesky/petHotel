import React, { useEffect, useState } from "react";

function DetailHosts({ hosts }) {
  const [detailed, setDetailed] = useState([]);

  return (
    <div className="DetailHosts">
      {hosts && (
        <>
          {hosts.map((host, i) => (
            <img
              src={host.foto_place}
              onClick={() => setDetailed(host)}
              key={i}
            />
          ))}
        </>
      )}
      <DetailHosts hosts={hosts} />
    </div>
  );
}

export default DetailHosts;
