import React from 'react';
import ReactDOM from 'react-dom';

class AddTask extends React.Component{
	
	submitHandler = () => {
		
		let task_obj = document.getElementById("add_task");
		
			if(task_obj.value === '')
			{
				alert("This field cannot be empty!");
			}
			else
			{
				let xhttp = new XMLHttpRequest();
					xhttp.open("GET", "http://localhost/uwi_internship/reactjs_task1/add_task.php?task=" + task_obj.value);
					xhttp.send();
					
						xhttp.onload = () => {
							
							if(xhttp.status === 200)
							{
							
									this.props.update();
									
										alert("Item Saved!");
							}
						}
						
						xhttp.onerror = () => {
							
							alert("An error occured");
							
						} 
			}
		
	}
	
	render(){
		return (	
		<form>
			<h2>Add Item</h2>
			<input type="text" id="add_task" />
			<button type="button" onClick={this.submitHandler}>Save</button>
		</form>
		);
		
	}
	
	
}

class Tasks extends React.Component{
	constructor(props){
		super(props);
		
		this.updateTask = this.updateTask.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		
		this.state = {tasks: [], task_list: []};
	}
	
	componentDidMount(){
		
		
		this.getTasks();
		
	}
	
	getTasks = () => {
		
		let xhttp = new XMLHttpRequest();
		xhttp.open("GET", "http://localhost/uwi_internship/reactjs_task1/get_tasks.php");
		xhttp.send();
		
			xhttp.onload = () => {
				
				if(xhttp.status === 200)
				{
					try{
						
						let tasks = JSON.parse(xhttp.responseText);
							this.setState({tasks: tasks});
							
							
					}
					catch(error)
					{
						
					}
				}
			}
			
			xhttp.onerror = () => {
				
				alert("An error occured while getting tasks");
					
			}
		
		
	}
	
	updateTask = (index) => {
		
		
		let task_id = "";
		let array = this.state.tasks.map( function(item, i){
			
			if(i === index)
			{
				
				task_id = item.Task_ID
				item.Task = document.getElementById("task_" + index).value;
				
				return item;
			}
			else
			{
				return item
			}
		
		})
		
		this.setState({tasks : array});
		
			if(task_id !== "")
			{
				
				let new_value = document.getElementById("task_" + index).value;
				
				let xhttp = new XMLHttpRequest();
				xhttp.open("GET", "http://localhost/uwi_internship/reactjs_task1/edit_task.php?task_id=" + task_id + "&change=" +  new_value);
				xhttp.send();
				
					xhttp.onload = () => {
						
						if(xhttp.status === 200)
						{
							
							alert("Item Updated");
							
						}
					}
					
					xhttp.onerror = () => {
						
						alert("An error occured while updating the task");
							
					}
				
			}
		
	}
	
	deleteTask = (task_id) => {
		
		const u_tasks = this.state.tasks.map( (item, i) => {
			
			if(item !== undefined)
			{
				if(Number(item.Task_ID) !== Number(task_id))
				{
				
					return item
				}
			}
			
		
		})
		
		this.setState({tasks : u_tasks});
	
		
		
			let xhttp = new XMLHttpRequest();
			xhttp.open("GET", "http://localhost/uwi_internship/reactjs_task1/delete_task.php?task_id=" + task_id);
			xhttp.send();
			
				xhttp.onload = () => {
					
					if(xhttp.status === 200)
					{
							
						alert("Item Deleted");
						
						
						
					}
				}
				
				xhttp.onerror = () => {
					
					alert("An error occured while deleting the task");
						
				}
			
			
		
	}
	
	
	onChangeHandler = (i) => {
		
			
				
	}
	
	render(){
		
		return(
				<div>
				<AddTask update = {this.getTasks} />
				<h2>Manage List</h2>
				
				{this.state.tasks.map( (item, i) => {  
					if(item !== undefined ) 
					{ 
						return <div className="task" key = {i}>
									<input type="text" onChange={() => this.onChangeHandler(i)} defaultValue = {item.Task} id = {"task_" + i} />
										<button onClick={() => this.updateTask(i)}>Save</button>
											<button onClick={() => this.deleteTask(item.Task_ID)}>Delete</button>
								</div> 
					}
					return false;
				})
					
				}
				
				<h2>To Do List</h2>
				<ShowTasks tasks={this.state.tasks} />
				</div>
				);
				
	}
		
	
	
}

class ShowTasks extends React.Component{
	
	render(){
	
		return(
			<div>
			{this.props.tasks.map(function (item, i){ 
				
				if(item !== undefined) 
				{
					return <div key = {i}>{item.Task}</div> 
				}
				
					return false;
				
				})
			}
			</div>
		);
		
	}
	
}


ReactDOM.render(<Tasks />, document.getElementById('root'));

