import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import TOTP from "../../api/totp.js";
import IntervalCircleOtp from "../Common/IntervalCircleOtp.js";

const TOTPTokenGenerator = () => {
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const intervalDuration = 30000; // 30 seconds in milliseconds

  useEffect(() => {
    const generateToken = () => {
      if (secret) {
        // const currentTime = Math.floor(Date.now() / intervalDuration);
        // const generatedToken = speakeasy.totp({
        //   secret: secret,
        //   encoding: "base32",
        //   window: 0,
        //   time: currentTime,
        // });
        const generatedToken = new TOTP(secret).getToken();
        console.log(`generatedToken"`, generatedToken);
        setToken(generatedToken);
      }
    };
    try {
      generateToken(); // Generate token immediately
      const intervalId = setInterval(generateToken, intervalDuration);

      return () => {
        clearInterval(intervalId);
      };
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [secret]);

  const handleSubmit = () => {
    try {
      const secret = inputRef.current.value.replace(/\s/g, "");
      setSecret(secret);
    } catch (err) {
      console.log(err);
      setError("Invalid secret, please enter a valid secret");
    }
  };

  if (secret) {
    return (
      <>
        <p className="is-size-3 has-text-centered">
          <div>
            {secret && (
              <div>
                <p>Current Token: {error ? error : token}</p>
                <div
                  className="has-text-centered mx-auto my-6"
                  style={{ width: "100px", height: "100px" }}
                >
                  <IntervalCircleOtp
                    intervalDuration={intervalDuration / 1000}
                    token={token}
                  />
                </div>
                {/* <QRCode value={`otpauth://totp/MyApp?secret=${secret}`} /> */}
              </div>
            )}
          </div>
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
              //   type="password"
              placeholder="JRGVQWCRJ5FEUR2BGNDTIUSDKNDVCM2ELFLTEMSGGQ3UQVZWGJIE4TSXIY2E2S2VJ5NESVSNGUZEQRKOI5IQ"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              ref={inputRef}
              //   value={secret}
              //   onChange={(e) => setSecret(e.target.value)}
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
};

export default TOTPTokenGenerator;
