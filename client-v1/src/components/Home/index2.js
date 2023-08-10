import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";

// import { generateTOTP } from "../../api/totp.js";
import TOTP from "../../api/totp.js";
import { numberWithSpaces } from "../../utils/index.js";

const generateToken = (secret) => {
  const totp = TOTP(secret.replace(/\s/g, ""));
  return _.padStart(totp, 6, "0");
};

function Home() {
  const [secret, setSecret] = useState(null);
  const [totp, setTotp] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(`reload`);
    if (secret) {
      const interval = setInterval(() => {
        setTotp(generateToken(secret));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [secret]);

  const handleSubmit = () => {
    try {
      const secret = inputRef.current.value.replace(/\s/g, "");
      setTotp(generateToken(secret));
      setSecret(secret);
    } catch (err) {
      console.log(err);
      setError("Invalid secret, please enter a valid secret");
    }
  };

  if (secret) {
    return (
      <>
        <p className="is-size-1 has-text-centered mb-4">
          {numberWithSpaces(totp)}
        </p>
        <p className="content has-text-centered pt-4">
          <div className="control">
            <button
              className="button is-danger"
              type="submit"
              onClick={() => setSecret(null)}
            >
              Reset
            </button>
          </div>
        </p>
      </>
    );
  } else {
    return (
      <>
        <div className="field container has-text-centered my-4">
          <label className="label">Secret</label>
          <div className="control">
            <input
              className="input"
              type="password"
              ref={inputRef}
              placeholder="JRGVQWCRJ5FEUR2BGNDTIUSDKNDVCM2ELFLTEMSGGQ3UQVZWGJIE4TSXIY2E2S2VJ5NESVSNGUZEQRKOI5IQ"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
          {error && <p className="help is-danger">{error}</p>}
          <p className="help">
            The secret code that you used to create your TOTP in the first
            place.
          </p>
        </div>

        <div className="control has-text-centered pt-3 mb-6">
          <button
            className="button is-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Generate
          </button>
        </div>
      </>
    );
  }
}

export default Home;
