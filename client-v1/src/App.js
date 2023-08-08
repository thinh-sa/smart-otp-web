import React, { useState } from "react";
import "bulma";

import TotpGenerator from "./components/Generator/index.js";
import Faq from "./components/faq.js";
import VerifierTotp from "./components/Verifier/index.js";
import AppContext from "./contexts";

function App() {
  const [contextValue, setContextValue] = useState({
    imageQrCode: "Hello from Context!",
    updateImageQrCode: (newImageQrCode) => {
      setContextValue((prevValue) => ({
        ...prevValue,
        imageQrCode: newImageQrCode,
      }));
    },
  });

  return (
    <AppContext.Provider value={contextValue}>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">TOTP Authenticator</h1>
          <h2 className="subtitle has-text-centered pt-2">
            The One-time Password Generator for when you have lost everything.
          </h2>
        </div>
      </section>
      <section className="section">
        <div
          className="container is-centered"
          style={{ maxWidth: "400px", marginTop: "-50px" }}
        >
          <TotpGenerator />
        </div>
      </section>
      <section className="section">
        <div
          className="container"
          style={{ maxWidth: "700px", marginTop: "-50px" }}
        >
          <VerifierTotp />
        </div>
      </section>
      {/* <footer class="footer">
        <div class="content has-text-centered">
          <p>
            Built with{" "}
            <span role="img" aria-label="heart emoji">
              ❤️
            </span>{" "}
            by{" "}
            <a href="https://carl-fredrik.arvidson.io">Carl-Fredrik Arvidson</a>
          </p>
        </div>
      </footer> */}
    </AppContext.Provider>
  );
}

export default App;
