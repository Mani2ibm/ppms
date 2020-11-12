import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { setCurrentUser } from './actions/authActions'

import Header from './component/layout/Header'
import Home from './component/layout/Home'
import Login from './component/auth/Login'
import Service from './component/layout/Service'
import './App.css';
import Trigger from './component/layout/Trigger';
import Action from './component/layout/Action'
import RuleList from './component/layout/RuleList';
import RuleEdit from './component/layout/RuleEdit';

//check for token 

if(localStorage.jwtToken) {
  const user = localStorage.jwtToken ? JSON.parse(localStorage.jwtToken) : {}
  store.dispatch(setCurrentUser(user));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/home" component={Home} />
          <div className="container login">
            <Route exact path="/Login" component={Login} /> 
            <Redirect from="/" to="/Login" exact />
            <Route exact path="/rule/create" component={Service} />
            <Route exact path="/rule/trigger" component={Trigger} />
            <Route exact path="/rule/action" component={Action} />
            <Route exact path="/rule/list" component={RuleList} />
            <Route exact path="/rule/edit" component={RuleEdit} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
