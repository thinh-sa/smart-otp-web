import axios from "axios";
import React, { useState } from "react";

function SMS() {
  const [phoneNumber, setPhoneNumber] = useState("+84852412699");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = axios
        .post(`${process.env.REACT_APP_API_URL}/send-activation-code`, {
          phoneNumber,
          userId: 1,
          deviceId: 2,
          appId: 1,
          account: "thinh-test2",
          issuer: "SmartOTP Demo Service",
          pin: "1234",
        })
        .then((res) => {
          console.log(res.data);
          if (res?.data?.code !== "000000") {
            setMessage(JSON.stringify(res?.data));
          } else {
            setMessage(`Transaction ID: ${JSON.stringify(res?.data?.data)}`);
          }
        });
    } catch (err) {
      console.log(`Error handleSubmit::`, err);
      setMessage("Invalid secret, please enter a valid secret");
    }
  };

  return (
    <section className="my-4">
      <div
        className="container is-centered mt-2"
        style={{ maxWidth: "700px", marginTop: "-20px" }}
      >
        <form>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <input
              style={{ padding: "8px 12px" }}
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="control has-text-centered pt-3 mt-4">
            <button
              className="button is-info"
              type="submit"
              onClick={handleSubmit}
            >
              Get SMS
            </button>
            {message && (
              <p
                className="has-text-centered"
                style={{ marginTop: "10px", fontWeight: "bold" }}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default SMS;
