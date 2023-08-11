import React, { useState } from "react";
import axios from "axios";
import OcraVerifier from "./OcraVerifier";
import Generator from "../Register";

function OCRA() {
  const [suite, setSuite] = useState("OCRA-1:HOTP-SHA1-6:QN08");
  const [sessionId, setSessionId] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [messageInfoCR, setMessageInfoCR] = useState("");

  const [crCode, setCrCode] = useState("");
  const [pin, setPin] = useState("");
  const [messageInfoOtp, setMessageInfoOtp] = useState("");

  const handleGenCrCode = (e) => {
    e.preventDefault();
    try {
      const res = axios
        .post(`${process.env.REACT_APP_API_URL}/create-cr-code`, {
          suite, // "OCRA-1:HOTP-SHA1-6:QN08"
          sessionId, // "sid-1234"
          toAccount, // "+84852412699"
        })
        .then((res) => {
          //   console.log(res?.data);
          if (res?.data?.code !== "000000") {
            setMessageInfoCR(res?.data?.message);
          } else {
            setMessageInfoCR(`CR Code: ${res?.data?.data?.crCode}`);
            setCrCode(res?.data?.data?.crCode);
          }
        });
    } catch (err) {
      console.log(`Error handleSubmit::`, err);
      setMessageInfoCR("Error when creating CR Code");
    }
  };

  const handleGenOTPOcra = (e) => {
    e.preventDefault();
    try {
      const res = axios
        .post(`${process.env.REACT_APP_SDK_URL}/generate-otp-ocra`, {
          crCode, // "OCRA-1:HOTP-SHA1-6:QN08:537992"
          pin, // "1234"
        })
        .then((res) => {
          //   console.log(res?.data);
          if (res?.data?.code !== "000000") {
            setMessageInfoOtp(res?.data?.message);
          } else {
            setMessageInfoOtp(`OTP Code: ${res?.data?.data?.otp}`);
            // setOtp(res?.data?.data?.otp);
          }
        });
    } catch (err) {
      console.log(`Error handleSubmit::`, err);
      setMessageInfoOtp("Error when creating OTP Code");
    }
  };

  return (
    <div
      className="container is-centered"
      style={{ maxWidth: "700px", marginTop: "50px" }}
    >
      {/* Register OTP */}
      <Generator />
      <hr className="is-divider" />
      {/* Generate CR Code */}
      <div style={{ flexDirection: "row", marginTop: "50px" }}>
        <form onSubmit={handleGenCrCode}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              disabled
              style={{ padding: "8px 12px", minWidth: "100px" }}
              type="text"
              placeholder="OCRA-1:HOTP-SHA1-6:QN08"
              value={suite}
              onChange={(e) => setSuite(e.target.value)}
            />
            <input
              style={{ padding: "8px 12px" }}
              type="text"
              placeholder="Session ID"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />
            <input
              style={{ padding: "8px 12px" }}
              type="text"
              placeholder="To Account"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
            />
          </div>
          <div className="control has-text-centered pt-3 mt-4">
            <button
              className="button is-primary"
              type="submit"
              onClick={handleGenCrCode}
            >
              Generate CR Code
            </button>
            {messageInfoCR && (
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {messageInfoCR}
              </p>
            )}
          </div>
        </form>
      </div>
      {/* Generate OTP OCRA */}
      <hr className="is-divider" />
      <div style={{ flexDirection: "row" }}>
        <form onSubmit={handleGenOTPOcra}>
          <div className="is-flex justify-content-center align-items-center">
            <input
              hidden
              style={{ padding: "8px 12px" }}
              type="text"
              placeholder="CR Code"
              value={crCode}
              onChange={(e) => setCrCode(e.target.value)}
            />
            <input
              style={{ padding: "8px 12px", margin: "0 auto" }}
              type="text"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="control has-text-centered pt-3 mt-4">
            <button
              className="button is-warning"
              type="submit"
              onClick={handleGenOTPOcra}
            >
              Generate OTP
            </button>
            {messageInfoOtp && (
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {messageInfoOtp}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Verify OTP OCRA */}
      <OcraVerifier crCode={crCode} />
    </div>
  );
}

export default OCRA;
