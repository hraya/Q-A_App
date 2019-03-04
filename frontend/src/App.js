import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js';
import Questions from './components/Questions.js';
import Question from './Question/Question.js'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
       <Route exact path='/' component={Questions} />
       <Route exact path='/question/:questionId' component={Question} />
      </div>
    );
  }
}

export default App;
