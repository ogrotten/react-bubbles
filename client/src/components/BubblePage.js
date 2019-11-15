import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

function clg(...x) {
	for (let exes of x) console.log(exes);
}

const url = "http://localhost:5000/api"

const axiosWithAuth = () => {
	return axios.create({
		headers: {
			authorization: sessionStorage.getItem("token")
		}
	})
}

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);
	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property

	const getData = () => {
		// get full friendlist
		const authAxios = axiosWithAuth();

		authAxios
			.get(`${URL}/friends`)
			.then(res => {
				// console.log(res.data);
				clg("34", res.data);
				setColorList(res.data);
				// setFriendsAll(res.data);
			})
	}


	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
