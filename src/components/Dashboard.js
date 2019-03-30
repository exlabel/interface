import React, {Component} from 'react'
import firebase from './../utils/firebase.js'

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.logOut = this.logOut.bind(this)
	}

	logOut() {
		let self = this
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			self.props.history.push('/')
		  }, function(error) {
			// An error happened.
		  });
	}

	componentDidMount() {
		let self = this
		firebase.auth().onAuthStateChanged(function(user) {
			if (!user) {
			  // User is signed out.
			  self.props.history.push('/')
			}
		  });
	}

	render() {
		return (
			<div>
				<h1>Dashboard | <button onClick={this.logOut}>Log Out</button></h1>

			</div>
		)
	}
}