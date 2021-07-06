import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

import "./SignIn.css";
import "./SignInForm.css";
import logo from "images/interview-dark.svg";
import { pageTransitions } from "utils/Animations";
import searchIcon from "images/searchIcon.png";

import { useAuthContext } from "hooks/useAuthContext";
import { url } from 'utils/constants';

export const SignIn: React.FC<{}> = (): React.ReactElement => {
  const { signIn } = useAuthContext()
	const [userDetails, setUserDetails] = useState({email: '', password: ''})

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserDetails((userDetails) => ({...userDetails, [event.target.name]: event.target.value}))
	}

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.token) {
          signIn(result.token)
        } else {
          console.log(result.error)
        }
      })
      .catch((err) => console.log('error', err.error))
  };

  return (
    <motion.div
      className="container"
      initial="initial"
      animate="animate"
      exit="initial"
      variants={pageTransitions}
    >
      <div className="form-container">
      <img className="form-logo" src={logo} alt="Interview Logo" />
					<form id="loginForm" onSubmit={(handleSubmit)}>
						<div className="input-container">
							<label htmlFor="email">Email address</label>
							<input 
								type="email" 
								id="email" 
								name="email" 
								onChange={(e) => handleOnChange(e)}
								required 
							/>
						</div>
						<div className="input-container">
							<label htmlFor="password">Password</label>
							<input 
								type="password" 
								id="password" 
								name="password" 
								onChange={(e) => handleOnChange(e)}
								required 
							/>
						</div>
            <button className="button" type="submit" form="loginForm">
							LOG IN
						</button>
					</form>
          <Link 
							className="text-button"
              to={url.passwordReset} 
            >
              Forgot your password?
            </Link>
        <div className="form-container-footer">
          <p>Don’t have an account?</p>
          <button className="text-button">Get started for free</button>
        </div>
      </div>
      <div className="vertical"></div>
      <div className="info-container">
        <img src={searchIcon} alt="search icon" />
        <h2>Your full solution to managing talent acquisition</h2>
        <h6>
          Say goodbye to silos and embrace a single sourcing, talent engagement,
          and hiring platform. Our solution creates a full talent lifecycle
          seamlessly uniting the advantages of our state of the art technology
        </h6>
      </div>
    </motion.div>
  );
}