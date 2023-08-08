import React, { useState, useRef, useEffect, useContext } from "react";
import _ from "lodash";
import axios from "axios";

import { generateTOTP } from "../../api/totp";
import { numberWithSpaces } from "../../utils";
import AppContext from "../../contexts";

const generateToken = (secret) => {
  const totp = generateTOTP(secret);
  return _.padStart(totp, 6, "0");
};

export default () => {
  const [secret, setSecret] = useState(null);
  const [totp, setTotp] = useState(null);
  const [error, setError] = useState(null);

  const [imageCode, setImageCode] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [transId, setTransId] = useState("");
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");

  const inputRef = useRef(null);

  const { imageQrCode, updateImageQrCode } = useContext(AppContext);

  useEffect(() => {
    if (secret) {
      const interval = setInterval(() => {
        setTotp(generateToken(secret));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [secret]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      //   const secret = inputRef.current.value.replace(/\s/g, "");
      // setTotp(generateToken(secret));
      // setSecret(secret);

      const res = axios
        .post(`${process.env.REACT_APP_SDK_URL}/register-otp-factor`, {
          activationCode, // "SLTDE4"
          transId, // 5
          pin: "1234",
        })
        .then((res) => {
          // console.log(res);
          if (!res?.data?.ok) {
            setValidated(false);
            setMessage("Input không hợp lệ");
          } else {
            setValidated(true);
            setImageCode(res?.data?.data?.qrCode);
            setMessage(`Secret Code: ${res?.data?.data?.secretKey}`);
          }
        });
    } catch (err) {
      console.log(`Error handleSubmit::`, err);
      setError("Invalid secret, please enter a valid secret");
    }
  };

  if (secret) {
    return (
      <>
        <p className="is-size-1 has-text-centered">{numberWithSpaces(totp)}</p>
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
      <div style={{ flexDirection: "row" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              style={{ padding: "8px 12px" }}
              type="text"
              placeholder="Activation code"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
            />
            <input
              style={{ padding: "8px 12px" }}
              type="number"
              placeholder="Transaction ID"
              value={transId}
              onChange={(e) => setTransId(e.target.value)}
            />
            {/* <input
              type="text"
              placeholder="Input 3"
              value={pin}
              onChange={handleInputChange3}
            /> */}
          </div>
          <div className="control has-text-centered pt-3 mt-4">
            <button
              className="button is-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Generate
            </button>
            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
          </div>
        </form>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            id="qrCode"
            alt=""
            src={imageCode}
            style={{
              display: "inline-block",
              maxHeight: "244px",
              maxWidth: "244px",
              marginLeft: "75px",
            }}
          />
          {imageCode && (
            <p style={{ overflow: "auto" }}>
              Scan the above with Google Authenticator or Authy to sync
            </p>
          )}
        </div>
      </div>
    );
  }
};
