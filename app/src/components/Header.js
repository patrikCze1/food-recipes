import React, {useState} from "react";

function Header({setQuery}) {
  const [queryText, setQueryText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(queryText);
  }
  return (
    <nav>
      <div className="nav-wrapper red">
        <form onSubmit={e => handleSubmit(e)}>
          <div className="input-field">
            <input id="search" type="search" value={queryText} onChange={(e) => setQueryText(e.target.value)} />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Header;
