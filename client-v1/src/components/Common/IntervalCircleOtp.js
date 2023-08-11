import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const IntervalCircleOtp = ({ intervalDuration = 30, token }) => {
  const [timeLeft, setTimeLeft] = useState(intervalDuration); // Initial value is the TOTP time step
  const [currentToken, setCurrentToken] = useState("");

  useEffect(() => {
    setCurrentToken(token);
    setTimeLeft(30); // Reset the countdown
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // Cleanup the interval when the component unmounts or when the token changes
    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, currentToken]);

  return (
    <div>
      <CircularProgressbar
        value={(timeLeft * 100) / intervalDuration}
        text={timeLeft}
      />
      {/* <div className="has-text-centered">
        <span>{timeLeft}s</span>
      </div> */}
    </div>
  );
};

export default IntervalCircleOtp;
