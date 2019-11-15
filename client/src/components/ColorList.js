import React, { useState } from "react";
import axios from "axios";

function clg(...x) {
	for (let exes of x) console.log(exes);
}

const initialColor = {
	color: "",
	code: { hex: "" }
};

const url = "http://localhost:5000/api"

const axiosWithAuth = () => {
	return axios.create({
		headers: {
			authorization: sessionStorage.getItem("token")
		}
	})
}


const ColorList = ({ colors, updateColors }) => {
	//   console.log("ColorList: ",colors);

	// Are we showing the edit section to change things?
	// `editing`: boolean
	const [editing, setEditing] = useState(false);

	/*
		colorToEdit:
		{
			code: {hex: "#000000"}
			color: "string name"
			id: 11
		}
	*/
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	// clg("CList, 19",editing, colorToEdit)

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = e => {
		e.preventDefault();
		clg("savedit",colorToEdit)
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
	};

	const deleteColor = color => {
		// make a delete request to delete this color
	};

	const transact = () => {
		// get full friendlist
		const authAxios = axiosWithAuth();
		authAxios
			.get(`${url}/colors`)
			.then(res => {
				// console.log(res.data);
				// clg("34", res.data);
				// setColorList(res.data);
				// setFriendsAll(res.data);
			})
			.catch(err => clg(`Problem: ${err}`))
	}

	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span className="delete" onClick={e => {
								e.stopPropagation();
								deleteColor(color)
							}
							}>
								x
              </span>{" "}
							{color.color}
						</span>
						<div
							className="color-box"
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
            <input
							onChange={e =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
            <input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className="spacer" />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
