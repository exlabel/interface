import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import firebase from './utils/firebase.js'

class Header extends Component {
	constructor(props) {
		super(props)
		this.logOut = this.logOut.bind(this)
		this.state = {
			loggedIn: (firebase.auth().currentUser !== null)
		}
	}

	logOut() {
		let self = this
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			// self.props.history.push('/')
		}, function(error) {
			// An error happened.
		})
	}

	componentDidRender() {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				this.setState({loggedIn:true})
			} else {
				this.setState({loggedIn:false})
			}
		  })
	}

	render() {
		let logInComponent = <Link to="/login">Login</Link>
		if (window.location.href.includes("dashboard") || this.state.loggedIn) {
			logInComponent = <a href="#" onClick={this.logOut}>Logout</a>
		}
		return (
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/dashboard">Dashboard</Link>
			</li>
			<li className="right-align">
				{ logInComponent }
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

        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </Router>
    );
  }
}

export default App;
