import React, { useState,useEffect } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);
	const [key, setKey] = useState(null);

	const apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/RicardoMiguelR";

	const getTodoList = async () => {
		try {
			let response = await fetch(apiUrl);
			let data = await response.json();
			setTaskList(data);
		} catch (e) {
			console.error(e);
		}
	};

	const updateTodoList = async (newList) => {
		try {
			let response = await fetch(apiUrl, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newList),
			});
			if (response.ok) {
				setTaskList(newList);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const addTask = (value) => {
		const newList = [...taskList, { label: value, done: false }];
		updateTodoList(newList);
		setInputValue("");
	};

	const handleDeleteTask = (index) => {
		const newList = taskList.filter((task, i) => i !== index);
		updateTodoList(newList);
	};

	const clearTasks = () => {
		const newList = [];
		updateTodoList(newList);
	};

	useEffect(() => {
		getTodoList();
	}, []);

	return (
		<div className="d-flex flex-column align-items-center">
			<div className="todo-list w-25">
				<div className="form-floating mb-3">
					<input
						value={inputValue}
						type="text"
						className="form-control"
						id="floatingInput"
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && inputValue !== "") {
								addTask(inputValue);
							}
						}}
					/>
					<label htmlFor="floatingInput">Your task</label>
				</div>
				<ul className="list-group">
					{taskList && taskList.length > 0 ? (
						taskList.map((task, index) => (
							<li
								onMouseEnter={() => setKey(index)}
								onMouseLeave={() => setKey(null)}
								className="list-group-item"
								key={index}
							>
								{task.label}
								{key === index && (
									<button
										className="btn btn-dark btn-xxs m-2"
										onClick={() => handleDeleteTask(index)}
									>
										<small className="text-danger">X</small>
									</button>
								)}
							</li>
						))
					) : (
						<h3>Agrega tus tareas</h3>
					)}
				</ul>
				<small>{taskList.length + " items left"}</small>
				<button className="btn btn-danger mt-3" onClick={clearTasks}>
					Clear All Tasks
				</button>
			</div>
		</div>
	);
};

export default Home;