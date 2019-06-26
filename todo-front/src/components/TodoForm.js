import React, { Component } from 'react';
import axios from 'axios';

class TodoForm extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	title: this.props.todo.title,
            description: this.props.todo.description,
            username: this.props.todo.username,
            status: this.props.todo.status
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
  			`http://localhost:3001/${this.props.todo.id}`,
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
              <label>
                <input
                type="radio"
                name="status"
				value="unfinished"
				checked={this.state.status === "unfinished"}
                className="form-check-input"
                />
                Working on...
              </label>
			  <label>
                <input
                type="radio"
                name="status"
				value="done"
				checked={this.state.status === "done"}
                className="form-check-input"
                />
                Done!
              </label>
			  <label>
                <input
                type="radio"
                name="status"
				value="undone"
				checked={this.state.status === "undone"}
                className="form-check-input"
                />
                Fail!
              </label>
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