import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

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
				<button className="btn btn-info"
				onClick={this.addNewTodo} >
					New Todo
				</button>
				<span className={this.state.alertClass}>
				  {this.state.notification}
				</span>
				{	this.state.todos.map((todo) => {
						if (this.state.editingTodoId === todo.id) {
							return (<TodoForm todo={todo} key={todo.id} 
								updateTodo={this.updateTodo} 
								titleRef={input => this.title = input}/>
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
    
}