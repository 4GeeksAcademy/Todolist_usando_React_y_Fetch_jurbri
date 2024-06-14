import React,{useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { array } from "prop-types";



const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]); 

	const addTask = (value)=>{
		setTaskList([...taskList, value])
		setInputValue("")
	}

	const handleDeleteTask = (index) => {
		setTaskList(taskList.filter((task, i) => i!== index));
	  }

	return (
		<div className="d-flex flex-column align-items-center" >
			<div className="todo-list w-25">
				<div className="form-floating mb-3  ">
					<input value={inputValue} type="text" class="form-control" id="floatingInput" onChange={(e)=> setInputValue(e.target.value)} onKeyDown={(e)=>{
						if(e.key == "Enter" && inputValue != ""){
							addTask(inputValue)
						}
					}} />
					<label for="floatingInput">Your task</label>
				</div>
				<ul className="list-group">
					{taskList && taskList.length > 0 && taskList.map((task, index)=> {
						return (
							<li className="list-group-item" key={index}>{task}
							<button className="btn btn-dark btn-xxs m-2" onClick={() => handleDeleteTask(index)}> <small className=" text-danger">X</small> </button>
							</li>
						)
					})}
					
				</ul>
				<small>{taskList.length+" items left"}</small>
			</div>

		</div> 

	);
};

export default Home;
