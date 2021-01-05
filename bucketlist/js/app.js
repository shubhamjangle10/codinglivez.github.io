//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event)
{
	//Prevent form from submitting
	event.preventDefault();
	//Todo DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add("todo");
	//create LI
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//ADD Todo TO LOCAL STORAGE
	saveLocalTodos(todoInput.value);
	//CHECK MARK Button
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	//CHECK TRASH Button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	//Append to List
	todoList.appendChild(todoDiv);
	//clear todoInput Value
	todoInput.value = "";
}

function deleteCheck(e)
{
	const item = e.target;
	//Detele Todo
	if(item.classList[0] === "trash-btn" )
	{
		const todo = item.parentElement;
		//Animation
		todo.classList.add('fall');
		removeLocalTodos(todo);
		todo.addEventListener('transitionend',function(){
			todo.remove();
		})
	}
	
	//check mark
	if(item.classList[0] === "complete-btn")
	{
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}


function filterTodo(e){
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
		switch(e.target.value){
			case "all":
			todo.style.display = "flex";
				break;
			case "completed":
				if(todo.classList.contains('completed')){
					todo.style.display = "flex";
				}else{
					todo.style.display = 'none';
				}
				break;
			case "incomplete":
				if(!todo.classList.contains('completed')){
					todo.style.display = "flex";
				}else{
					todo.style.display = 'none';
				}
				break;		
		}
	})
}

function saveLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos') === null)
	{
		todos = [];
	} else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.push(todo);
	localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
	let todos;
	if(localStorage.getItem('todos') === null)
	{
		todos = [];
	} else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function(todo){
		//Todo DIV
		const todoDiv = document.createElement('div');
		todoDiv.classList.add("todo");
		//create LI
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);
		//CHECK MARK Button
		const completedButton = document.createElement("button");
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);
		//CHECK TRASH Button
		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		//Append to List
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos') === null)
	{
		todos = [];
	} else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}


const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});