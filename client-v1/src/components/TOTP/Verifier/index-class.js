import React, { Component } from "react";
import axios from "axios";
// import { Alert, Row, Col, Form, FormField, FormInput, Button } from "elemental";
import logo from "./logo.svg";
import "./TotpVerifier.css";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  flex: ${(props) => props.sm};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  ${(props) => props.offsetAbsentLabel && "margin-top: 2rem;"}
`;

const FormInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: #fff;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

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

class TotpVerifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      inputPassword: "",
      inputCode: "",
      validated: false,
      imageCode: "favicon.ico",
      infoMessage: "",
      errorMessage: "",
    };

    var self = this;

    // fetch("/register-otp", { method: "POST", mode: "cors" })
    //   .then((response) => {
    //     return response.text();
    //   })
    //   .then((imgCode) => {
    //     self.setState({ imageCode: imgCode });
    //   });

    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/register-otp-factor`, {
    //     activationCode: "SLTDE4",
    //     transId: 5,
    //     pin: "1234",
    //   })
    //   .then((res) => {
    //     // console.log(res);
    //     self.setState({ imageCode: res?.data?.data?.qrCode });
    //   });
  }

  componentDidMount() {}

  login(e) {
    e.preventDefault();
    var self = this;

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        email: self.state.inputEmail,
        password: self.state.inputPassword,
        userToken: self.state.inputCode,
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
        console.log(self);
        self.setState({ infoMessage: result, errorMessage: "" });
      })
      .catch((err) => {
        console.log(self.state);
        self.setState({ errorMessage: err.message, infoMessage: "" });
      });
  }

  render() {
    var self = this;

    function updateEmail(e) {
      self.setState({
        inputEmail: e.target.value,
        validated:
          self.state.inputEmail.length > 0 &&
          self.state.inputPassword.length > 0 &&
          self.state.inputCode.length === 6,
      });
    }

    function updatePassword(e) {
      self.setState({
        inputPassword: e.target.value,
        validated:
          self.state.inputEmail.length > 0 &&
          self.state.inputPassword.length > 0 &&
          self.state.inputCode.length === 6,
      });
    }

    function updateInputCode(e) {
      self.setState({
        inputCode: e.target.value,
        validated:
          // self.state.inputEmail.length > 0 &&
          // self.state.inputPassword.length > 0 &&
          e.target.value.length === 6,
      });
    }

    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>TOTP Verifier</h2>
          </div>
          {/* <p className="App-intro">
            <code>
              Username is 'tester@test.com', password is 'test'. Scan the right
              to setup.
            </code>
          </p> */}

          {this.state.infoMessage !== "" && (
            <Alert type="success">
              <strong>{this.state.infoMessage}</strong>
            </Alert>
          )}
          {this.state.errorMessage !== "" && (
            <Alert type="danger">
              <strong>{this.state.errorMessage}</strong>
            </Alert>
          )}
          <Row style={{ marginTop: "50px" }}>
            <Col sm="2/3">
              <Form>
                {/* <FormField
                  id="email"
                  label="Email address"
                  htmlFor="horizontal-form-input-email"
                >
                  <FormInput
                    value={this.inputEmail}
                    onChange={updateEmail}
                    type="email"
                    placeholder="Enter email"
                    name="horizontal-form-input-email"
                  />
                </FormField>
                <FormField
                  id="password"
                  label="Password"
                  htmlFor="horizontal-form-input-password"
                >
                  <FormInput
                    value={this.inputPassword}
                    onChange={updatePassword}
                    type="password"
                    placeholder="Password"
                    name="horizontal-form-input-password"
                  />
                </FormField> */}
                <FormField id="inputCode" label="OTP code">
                  <FormInput
                    value={this.inputCode}
                    onChange={updateInputCode}
                    type="number"
                    placeholder="Input OTP code here"
                    name="horizontal-form-input-otp"
                  />
                </FormField>
                <FormField offsetAbsentLabel>
                  <Button
                    disabled={!this.state.validated}
                    onClick={this.login.bind(this)}
                  >
                    Submit
                  </Button>
                </FormField>
              </Form>
            </Col>
            <Col sm="1/3" style={{ marginLeft: "auto" }}>
              <img id="qrCode" alt="" src={this.state.imageCode} />
              <p>Scan the above with Google Authenticator or Authy to sync</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TotpVerifier;
