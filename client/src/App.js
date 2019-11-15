import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage"
import PrivateRoute from "./components/PrivateRoute";

import "./styles.scss";

function clg(...x) {
	for (let exes of x) console.log(exes);
}


function App() {
	return (
		<Router>
			<div className="App">
				{/* 
				Build a PrivateRoute component that will 
				display BubblePage when you're authenticated 
				*/}
				<Switch>
					<PrivateRoute path="/bubbs">
						<BubblePage />
					</PrivateRoute>
					<Route exact path="/" component={Login} />
				</Switch>

			</div>
		</Router>
	);
}

export default App;
