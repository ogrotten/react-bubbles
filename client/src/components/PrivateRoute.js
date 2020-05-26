import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthent = () => {
	return sessionStorage.getItem("token") ? true : false;
}

export default function PrivateRoute({ children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthent() ? (children
				) : (
						<Redirect to={{
							pathname: "/",
							state: { from: location }
						}} />
					)
			}
		/>
	)
}