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
			description: this.state.description,
			username: this.state.username,
			status: this.state.status
  		}
  		axios.put(
  			`http://localhost:3001/${this.props.todo.id}`,
  			{ 
  				todo: todo
  		})
  		.then(response => {
  			console.log(response);
  			this.props.updateTodo(response.data.todo, response.data.event); // triggers updateTodo function in TodosContainer component with the updated todo as its argument
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
			<input 
	            className='input'
	            type="text"
	            name="username"
	            placeholder='Enter an username...'
	            value={this.state.username}
	            onChange={this.handleInput} 
	        	ref={this.props.titleRef} />
              <label>
                <input
					type="radio"
					name="status"
					value="unfinished"
					defaultChecked={this.state.status === "unfinished"}
					onChange={this.handleInput} 
					className="radio-inline" />
                Working on...
              </label>
			  <label>
                <input
					type="radio"
					name="status"
					value="done"
					defaultChecked={this.state.status === "done"}
					onChange={this.handleInput} 
					className="radio-inline" />
                Done!
              </label>
			  <label>
                <input
					type="radio"
					name="status"
					value="undone"
					defaultChecked={this.state.status === "undone"}
					onChange={this.handleInput} 
					className="radio-inline" />
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