import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.css';
import auth0Client from './components/Auth.js';
import NavBar from './components/NavBar.js';
import Questions from './components/Questions.js';
import Question from './Question/Question.js';
import Callback from './components/Callback.js';
import NewQuestion from './NewQuestion/NewQuestion.js';
import SecuredRoute from './SecuredRoute/SecuredRoute.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      checkingSession: true,
    }
  }
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Questions} />
        <Route exact path="/question/:questionId" component={Question} />
        <Route exact path="/callback" component={Callback} />
        <SecuredRoute path="/new-question" component={NewQuestion} checkingSession={this.state.checkingSession} />
      </div>
    );
  }
}

export default withRouter(App);
