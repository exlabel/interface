import React, {Component} from 'react'
import firebase from './../utils/firebase.js'

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.logOut = this.logOut.bind(this)
		this.musicUploaded = this.musicUploaded.bind(this)
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

	musicUploaded() {
		console.log(this.uploadInput.value)
		console.log(this.songTitle.value)

		// call python script
		const spawn = require("child_process").spawn;
		const pythonProcess = spawn('python',["./../python/nir.py", this.uploadInput.value])
		pythonProcess.on('data', (data) => {
			console.log(data)
		})
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
				<form onSubmit={this.musicUploaded} action="#" >
					<input ref={(ref) => { this.uploadInput = ref }} type="file" />
					<input ref={(ref) => { this.songTitle = ref; }} type="text" placeholder="Song Title" />
					<button>Upload</button>
				</form>
			</div>
		)
	}
}