import React, { useState, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransitions } from "utils/Animations";
import logo from "images/interview-dark.svg";
import { url, apiUrl } from "utils/constants";

export const PasswordReset: React.FC = (): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState("");
  const history = useHistory();

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}${apiUrl.auth.passwordReset}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => {
        // Handle successful api call
        if (res.ok) {
          history.push(url.signIn);
          // Show error message
        } else {
          setApiError("There was a problem with your request");
        }
      })
      .catch((err) => err);
  };

  return (
    <motion.div
      className="container slim-container"
      initial="initial"
      animate="animate"
      exit="initial"
      variants={pageTransitions}
    >
      <div className="form-container">
        <img className="form-logo" src={logo} alt="Interview Logo" />
        {apiError && <p className="error-message">{apiError}</p>}
        <form className="form" id="recoverForm" onSubmit={handleSubmit}>
          <div className="input-container">
            <p>
              Please enter the email address you would like the recovery link
              sent to.
            </p>
          </div>
          <div className="input-container">
            <label htmlFor="email">
              EMAIL ADDRESS
              <input
                type="email"
                id="email"
                name="email"
                onChange={(event) => handleOnChange(event)}
                required
              />
            </label>
          </div>
        </form>
        <div className="center-text">
          <button className="button" type="submit" form="recoverForm">
            SUBMIT
          </button>
          <Link className="text-button" to={url.signIn}>
            Back to sign in
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
