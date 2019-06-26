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
            alertClass: 'alert '
    	}
    }

	componentDidMount() {
		axios.get('http://localhost:3001/')
		.then(response => {
			console.log(response);
			this.setState({ todos: response.data });
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	render() {
		return (
			<div>
                <span className={this.state.alertClass}>
				  {this.state.notification}
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
	        description: ''
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

	updateTodo = (todo) => {
		const todoIndex = this.state.todos.findIndex(x => x.id === todo.id);
		const todos = update(this.state.todos, {
			[todoIndex]: {$set: todo}
		});
		this.setState({
			todos: todos,
			notification: 'All changes saved!'
		});
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