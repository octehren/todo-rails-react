import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Todo from './Todo';
import TodoForm from './TodoForm';

class TodosContainer extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
        	todos: [],
        	editingTodoId: null,
            notificationMessage: '',
            notificationColor: '',
			alertClass: 'alert ',
			defaultUsername: ''
    	}
    }

	componentDidMount() {
		axios.get('http://localhost:3001/')
		.then(response => {
			console.log(response);
			this.setState({ todos: response.data });
			this.setState({ defaultUsername: this.state.todos[0].username })
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	render() {
		return (
			<div>
                <span className={this.state.alertClass}>
				  <p style={{textColor: this.state.notificationColor}}>{this.state.notificationMessage}</p>
				</span>
                <div className="row">
                    <button className="btn btn-info"
                    onClick={this.addNewTodo} >
                        New To-do
                    </button>
                </div>
				{	this.state.todos.map((todo) => {
						if (this.state.editingTodoId === todo.id) {
							return (<TodoForm todo={todo} key={todo.id} 
								updateTodo={this.updateTodo} 
								titleRef={input => this.title = input}/>
                            )
						} else {
							return (<Todo todo={todo} key={todo.id} 
								onClick={this.enableEditing} 
								onDelete={this.deleteTodo} />
							);
						}
					})
				}
			</div>
		)

    }
    addNewTodo = () => {
		axios.post(
	    'http://localhost:3001/',
	    { todo:
	      {
	        title: '',
			description: '',
			status: 'unfinished',
			username: this.state.defaultUsername
	      }
	    }
	  )
	  .then(response => {
	    console.log(response);
	    const todos = update(this.state.todos, {
	    	$splice: [[0,0,response.data]]
	    });
	    this.setState({
	    	todos: todos,
	    	editingTodoId: response.data.id
	    });
	  })
	  .catch(function(error) { console.log(error); } );
	}

	updateTodo = (todo, notification) => {
		const todoIndex = this.state.todos.findIndex(x => x.id === todo.id);
		const todos = update(this.state.todos, {
			[todoIndex]: {$set: todo}
		});
		let newState = { todos: todos, defaultUsername: todo.username }
		if (notification != undefined) {
			newState.notificationMessage = notification.message;
			newState.notificationColor = notification.color;
			if (notification.kind === "congratulations") {
				newState.alertClass = "alert alert-success";
			} else {
				newState.alertClass = "alert alert-warning";
			}
		} else {
			newState.notificationMessage = "All changes saved!";
		}
		this.setState(newState);
		this.resetNotification(); // clears notification after 3 seconds;
	}

	deleteTodo = (id) => {
	    axios.delete(`http://localhost:3001/todos/${id}`)
	    .then(response => {
	      const todoIndex = this.state.todos.findIndex(x => x.id === id);
	      const todos = update(this.state.todos, { $splice: [[todoIndex, 1]]});
	      this.setState({todos: todos});
	    })
	    .catch(function(error) {
	    	console.log(error)
	    });
	}

	enableEditing = (id) => {
		this.setState({editingTodoId: id},
			() => {this.title.focus();});
	}

	resetNotification = () => {
		setTimeout(() => this.setState({notificationMessage: '', notificationColor: '', alertClass: 'alert '}), 3000);
	}
}

export default TodosContainer;