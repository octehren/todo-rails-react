import React, { Component } from 'react';
import './App.css';
import TodosContainer from './components/TodosContainer';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="app-header">
          <h1>To-do List</h1>
        </div>
        <TodosContainer />
      </div>
    );
  }
}

export default App;
