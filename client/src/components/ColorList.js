import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";


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

	const newList = []

	const saveEdit = e => {
		e.preventDefault();
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?

		// clg("savedit", colorToEdit)
		const authAxios = axiosWithAuth();
		authAxios
			.put(`${url}/colors/${colorToEdit.id}`, colorToEdit)
			.then(res => {
				// clg("58", res.data);
				clg("58", colors);
				// clg(colors)
				const changed = res.data;
				updateColors(colors.map(col => {
					if (col.id === changed.id) {
						// colors. changed
						col.color = changed.color;
						col.code.hex = changed.code.hex;
						return col;
					}
					else { return col };
				}))
				// clg("73",colors)

				// updateColors(...colors);
				// setColorList(res.data);
			})
			.catch(err => clg(`Edit Problem: ${err}`))
	};

	const deleteColor = color => {
		// make a delete request to delete this color
		// clg("DELETE", color)
		const authAxios = axiosWithAuth();
		authAxios
			.delete(`${url}/colors/${color.id}`, color)
			.then(res => {
				// // const remv = colors.findIndex(col => col.id === color.id)
				// // colors.splice(remv, 1)
				// updateColors(colors.splice(colors.findIndex(col => col.id === color.id), 1));
				// // clg("94", remv, colors);
				updateColors(colors.filter(col => 
					col.id != color.id
				))

				clg("94", colors);
			})
			.catch(err => clg(`Delete Problem: ${err}`))
	};

	// useEffect(() => {
	// 	updateColors(getData());
	// }, [])

	// clg("98",colors);

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
							}>x</span>{" "}
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
