import React, { useState } from "react";

function Ingredient({ name, original }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="col s6">
      <div className={checked ? "card green lighten-2" : "card"}>
        <div className="center">
          <h4>{name}</h4>
        </div>

        <div className="card-content" style={{ paddingTop: 5 }}>
          <ul>
            <li>{original}</li>
          </ul>
        </div>
        <div className="card-action">
          <button
            className="btn green darken-1"
            onClick={() => setChecked(true)}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ingredient;
