import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './logo.svg'
import './App.css'
import Index from './components/Index.js'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'

class Header extends Component {
  render() {
    return (
      <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Header />

        <Route exact path="/" component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </Router>
    );
  }
}

export default App;
