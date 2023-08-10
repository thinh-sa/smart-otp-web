import React from "react";

import TotpGenerator from "../Register/index";
import VerifierTotp from "./Verifier/index";
import Home from "../Home/index";

function TOTP() {
  return (
    <div style={{ marginTop: "50px" }}>
      <section className="section">
        <div
          className="container is-centered"
          style={{ maxWidth: "400px", marginTop: "-50px" }}
        >
          <TotpGenerator />
        </div>
      </section>

      <Home />

      <section className="section">
        <div
          className="container"
          style={{ maxWidth: "700px", marginTop: "-50px" }}
        >
          <VerifierTotp />
        </div>
      </section>
    </div>
  );
}

export default TOTP;
