import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import axios from "axios";
// import { Alert, Row, Col, Form, FormField, FormInput, Button } from "elemental";
import logo from "./logo.svg";
import "./TotpVerifier.css";
import styled from "styled-components";
import AppContext from "../../../contexts";

const Alert = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  ${(props) =>
    props.type === "success"
      ? "border-color: #28a745; background-color: #d4edda;"
      : ""}
  ${(props) =>
    props.type === "danger"
      ? "border-color: #dc3545; background-color: #f8d7da;"
      : ""}
`;

export default () => {
  // const { imageQrCode, updateImageQrCode } = useContext(AppContext);
  // console.log(`imageQrCode::`, imageQrCode);
  const [inputCode, setInputCode] = useState("");
  const [inputUserId, setInputUserId] = useState("");
  const [inputDeviceId, setInputDeviceId] = useState("");
  const [validated, setValidated] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  // useEffect(() => {
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/register-otp-factor`, {
  //       activationCode: "SLTDE4",
  //       transId: 5,
  //       pin: "1234",
  //     })
  //     .then((res) => {
  //       // console.log(res);
  //       setImageCode(res?.data?.data?.qrCode);
  //     });
  // }, []);

  const updateInputCode = (e) => {
    setInputCode(e.target.value);
    setValidated(e.target.value.length === 6);
  };

  const updateUserId = (e) => {
    setInputUserId(e.target.value);
    setValidated(e.target.value.length > 0);
  };

  const updateDeviceId = (e) => {
    setInputDeviceId(e.target.value);
    setValidated(e.target.value.length > 0);
  };

  const verifyTotp = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        userId: inputUserId,
        deviceId: inputDeviceId,
        userOtp: inputCode,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          return response.text().then((err) => {
            throw new Error(err);
          });
        }
        return response.text();
      })
      .then((result) => {
        setInfoMessage(result);
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setInfoMessage("");
      });
  };

  return (
    <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TOTP Verifier</h2>
        </div>

        {infoMessage !== "" && (
          <Alert type="success">
            <strong>{infoMessage}</strong>
          </Alert>
        )}
        {errorMessage !== "" && (
          <Alert type="danger">
            <strong>{errorMessage}</strong>
          </Alert>
        )}
        <div style={{ marginTop: "50px" }}>
          <form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                style={{ padding: "8px 12px" }}
                type="number"
                placeholder="User ID"
                value={inputUserId}
                onChange={updateUserId}
              />
              <input
                style={{ padding: "8px 12px" }}
                type="number"
                placeholder="Device ID"
                value={inputDeviceId}
                onChange={updateDeviceId}
              />
              <input
                style={{ padding: "8px 12px" }}
                type="text"
                placeholder="User OTP"
                value={inputCode}
                onChange={updateInputCode}
              />
            </div>
            <div className="control has-text-centered pt-3 mt-4">
              <button
                disabled={!validated}
                className="button is-link"
                type="submit"
                onClick={verifyTotp}
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
