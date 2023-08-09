import React, { useState } from "react";
import axios from "axios";

function OcraVerifier({ crCode }) {
  const [userId, setUserId] = useState();
  const [deviceId, setDeviceId] = useState();
  //   const [crCode, setCrCode] = useState(crCode);
  const [userOtp, setuserOtp] = useState("");
  const [messageInfo, setMessageInfo] = useState("");

  const handleVerifyOTPOcra = (e) => {
    e.preventDefault();
    try {
      const res = axios
        .post(`${process.env.REACT_APP_API_URL}/verify-ocra-otp`, {
          userId,
          deviceId,
          crCode,
          userOtp,
        })
        .then((res) => {
          //   console.log(res?.data);
          if (!res?.data?.ok) {
            setMessageInfo(res?.data?.message);
          } else {
            setMessageInfo(`Status: ${res?.data?.message}`);
            // setOtp(res?.data?.data?.otp);
          }
        });
    } catch (err) {
      console.log(`Error handleSubmit::`, err);
      setMessageInfo("Error when creating OTP Code");
    }
  };

  return (
    <div>
      {/* Verify OTP OCRA */}
      <hr className="is-divider" />
      <div style={{ flexDirection: "row" }}>
        <form onSubmit={handleVerifyOTPOcra}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <div> */}
            <input
              style={{ padding: "8px 12px" }}
              type="number"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              style={{ padding: "8px 12px" }}
              type="number"
              placeholder="Device ID"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
            />
            {/* </div>
            <div> */}
            <input
              hidden
              style={{ padding: "8px 12px" }}
              type="text"
              placeholder="CR Code"
              value={crCode}
              //   onChange={(e) => setCrCode(e.target.value)}
            />
            <input
              style={{ padding: "8px 12px" }}
              type="text"
              placeholder="User OTP"
              value={userOtp}
              onChange={(e) => setuserOtp(e.target.value)}
            />
            {/* </div> */}
          </div>
          <div className="control has-text-centered pt-3 mt-4">
            <button
              className="button is-link"
              type="submit"
              onClick={handleVerifyOTPOcra}
            >
              Verify OTP
            </button>
            {messageInfo && (
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {messageInfo}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default OcraVerifier;
