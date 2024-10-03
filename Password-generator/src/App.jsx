import React, { useEffect, useState, useCallback, useRef } from "react";
import "./App.css";

const App = () => {
  const [passlength, setPasslength] = useState(8);
  const [addnumber, setAddnumber] = useState(false);
  const [addsymbol, setAddsymbol] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let number = "0123456789";
    let symbol = "!@#$%^&*-_+=[]{}~`";
    if (addnumber) string += number;
    if (addsymbol) string += symbol;
    for (let i = 1; i <= passlength; i++) {
      let Random = Math.floor(Math.random() * string.length);
      pass += string.charAt(Random);
    }
    setPassword(pass);
  }, [addnumber, addsymbol, passlength]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="main">
      <h1>Random Password Generator</h1>
      <div className="container">
        <input
          className="display"
          type="text"
          readOnly
          value={password}
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}>Copy</button>
        <div className="button-container">
          <div className="slider">
            <input
              type="range"
              min={1}
              max={100}
              value={passlength}
              onChange={(e) => setPasslength(Number(e.target.value))}
            />
            <label>Length: {passlength}</label>
          </div>
          <div className="number">
            <input
              type="checkbox"
              checked={addnumber}
              onChange={() => setAddnumber((prev) => !prev)}
            />
            <label>Add Number</label>
          </div>
          <div className="symbol">
            <input
              type="checkbox"
              checked={addsymbol}
              onChange={() => setAddsymbol((prev) => !prev)}
            />
            <label>Add Special Symbol</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
