import React from 'react';
import './App.css';
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Order from './Components/Order';
import Form from './Components/Form';

function App() {
  return (
    <Router>
    <div className="App">
  <Switch>
    <Route path='/' exact component={Login}/>
    <Route path='/register' component={Register}/>
    <Route path='/home' component={Home}/>
    <Route path='/form' component={Form}/>
    <Route path='/order' component={Order}/>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
