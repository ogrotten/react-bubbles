import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:5000";

function clg(...x) {
	for (let exes of x) console.log(exes);
}


const Login = () => {
	const [cred, setCred] = useState({ username: "", password: "" });
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	
	// control form fields
	const doChange = e => {
		// clg(credentials);
		setCred({ ...cred, [e.target.name]: e.target.value })
	}


	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	return (
		<>
			<div>
				<h1>Welcome to the Bubble App!</h1>
			</div>
			<div>
				<p>
					{isLoggedIn ? "Logged In" : "Do a logging in plz"}
				</p>
				<form onSubmit={loginAction}>
					<p>Lambda School :: {pass}</p>
					<input type="text" name="username" value={cred.username} onChange={doChange} />
					<input type="password" name="password" value={cred.password} onChange={doChange} />
					<button>login</button>
				</form>
			</div>
		</>
	);
};

export default Login;
