import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js';
import Questions from './components/Questions.js';
import Question from './Question/Question.js';
import Callback from './components/Callback.js';
import NewQuestion from './NewQuestion/NewQuestion.js';
import SecuredRoute from './SecuredRoute/SecuredRoute.js';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
       <Route exact path='/' component={Questions} />
       <Route exact path='/question/:questionId' component={Question} />
       <Route exact path='/callback' component={Callback} />
       <SecuredRoute path='/new-question' component={NewQuestion} />
      </div>
    );
  }
}

export default App;
