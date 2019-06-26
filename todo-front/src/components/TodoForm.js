import React, { Component } from 'react';
import axios from 'axios';

class TodoForm extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	title: this.props.todo.title,
	    	description: this.props.todo.description
	    }
  	}

  	handleInput = (e) => {
  		this.setState( {[e.target.name]: e.target.value })
  	}

  	handleBlur = () => {
  		const todo = {
  			title: this.state.title,
  			description: this.state.description
  		}
  		axios.put(
  			`http://localhost:3001/api/v1/todos/${this.props.todo.id}`,
  			{ 
  				todo: todo
  		})
  		.then(response => {
  			console.log(response);
  			this.props.updateTodo(response.data); // triggers updateTodo function in TodosContainer component with the updated todo as its argument
  		})
  		.catch(function(error) {
  			console.log(error);
  		});
  	}

  	render() { // onBlur executes once user leaves input field
	    return (
	      <div className="tile">
	        <form onBlur={this.handleBlur}>
	          <input 
	            className='input' 
	            type="text"
	            name="title" 
	            placeholder='Enter a Title'
	            value={this.state.title}
	            onChange={this.handleInput} 
	        	ref={this.props.titleRef} />
	          <textarea 
	            className='input' 
	            name="description"
	            placeholder='Describe your task'
	            value={this.state.description}
	            onChange={this.handleInput}>
	            </textarea>
	        </form>
	      </div>
	    );
    }

}

export default TodoForm;